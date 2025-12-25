import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Filter, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface SubmittedReportsProps {
  onBack: () => void;
}

interface Report {
  reportId: string;
  project: string;
  auditType: string;
  date: string;
  activities: string[];
  responses: Record<string, any>;
  status: string;
}

export default function SubmittedReports({ onBack }: SubmittedReportsProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [projectsMap, setProjectsMap] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('auditReports') || '[]');
    setReports(savedReports);
    
    // Load projects to get project names
    const defaultProjects = [
      { id: 'PROJ001', name: 'Metro Rail Phase 2 - Mumbai' },
      { id: 'PROJ002', name: 'Highway NH-48 - Gujarat' },
      { id: 'PROJ003', name: 'Warehouse Construction - Pune' },
      { id: 'PROJ004', name: 'Bridge Construction - Delhi' },
      { id: 'PROJ005', name: 'Residential Complex - Bangalore' },
    ];
    
    const uploadedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    const allProjects = [
      ...defaultProjects,
      ...uploadedProjects.map((project: any) => ({
        id: project.projectId,
        name: project.projectName,
      })),
    ];
    
    // Create a map of project ID to project name
    const map: Record<string, string> = {};
    allProjects.forEach((project) => {
      map[project.id] = project.name;
    });
    setProjectsMap(map);
  }, []);
  
  const getProjectDisplay = (projectId: string) => {
    const projectName = projectsMap[projectId];
    return projectName ? `${projectId} - ${projectName}` : projectId;
  };

  const calculateNCStatus = (report: Report) => {
    const responses = Object.values(report.responses);
    const nonConforming = responses.filter((r: any) => r.answer === 'No');
    const ncOpen = nonConforming.filter((r: any) => r.closureAvailable === 'No').length;
    return ncOpen > 0 ? 'red' : 'green';
  };

  const getStats = (report: Report) => {
    const responses = Object.values(report.responses);
    const totalChecks = responses.length;
    const conforming = responses.filter((r: any) => r.answer === 'Yes').length;
    const nonConforming = responses.filter((r: any) => r.answer === 'No').length;
    const ncClosed = responses.filter((r: any) => r.answer === 'No' && r.closureAvailable === 'Yes').length;
    const ncOpen = responses.filter((r: any) => r.answer === 'No' && r.closureAvailable === 'No').length;
    
    return { totalChecks, conforming, nonConforming, ncClosed, ncOpen };
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.auditType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProject = filterProject === 'all' || report.project === filterProject;
    
    return matchesSearch && matchesProject;
  });

  const projects = Array.from(new Set(reports.map((r) => r.project)));

  if (selectedReport) {
    const stats = getStats(selectedReport);
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setSelectedReport(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Report Details</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedReport.reportId}</p>
                </div>
                <Badge className={stats.ncOpen > 0 ? 'bg-red-500' : 'bg-green-500'}>
                  {stats.ncOpen > 0 ? 'NC Open' : 'All Clear'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Project</p>
                  <p>{getProjectDisplay(selectedReport.project)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Audit Type</p>
                  <p>{selectedReport.auditType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p>{new Date(selectedReport.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="capitalize">{selectedReport.status}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Activities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.activities.map((activity) => (
                    <Badge key={activity} variant="outline">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-gray-600 text-sm">Total</div>
                    <div className="text-blue-600">{stats.totalChecks}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-gray-600 text-sm">Conforming</div>
                    <div className="text-green-600">{stats.conforming}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-gray-600 text-sm">Non-Conforming</div>
                    <div className="text-red-600">{stats.nonConforming}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-gray-600 text-sm">NC Closed</div>
                    <div className="text-green-600">{stats.ncClosed}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-gray-600 text-sm">NC Open</div>
                    <div className="text-red-600">{stats.ncOpen}</div>
                  </CardContent>
                </Card>
              </div>

              {stats.nonConforming > 0 && (
                <div>
                  <h3 className="mb-3">Non-Conformances</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedReport.responses)
                      .filter(([_, response]: [string, any]) => response.answer === 'No')
                      .map(([key, response]: [string, any]) => (
                        <Card key={key} className="border-l-4 border-l-red-500">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-sm text-gray-600">Activity: {key.split('-')[0]}</p>
                                {response.ncStatement && (
                                  <p className="mt-2">{response.ncStatement}</p>
                                )}
                              </div>
                              <Badge className={response.closureAvailable === 'Yes' ? 'bg-green-500' : 'bg-red-500'}>
                                {response.closureAvailable === 'Yes' ? 'Closed' : 'Open'}
                              </Badge>
                            </div>
                            {response.closureAvailable === 'Yes' && response.closureAction && (
                              <div className="mt-3 p-3 bg-green-50 rounded">
                                <p className="text-sm text-gray-600">Closure Action:</p>
                                <p className="text-sm mt-1">{response.closureAction}</p>
                              </div>
                            )}
                            {response.closureAvailable === 'No' && (
                              <div className="mt-3 p-3 bg-orange-50 rounded">
                                <p className="text-sm text-gray-600">Expected Action:</p>
                                <p className="text-sm mt-1">{response.expectedAction}</p>
                                <p className="text-sm text-gray-600 mt-2">Expected Date:</p>
                                <p className="text-sm mt-1">{response.expectedDate}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by report number, project, or audit type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-full md:w-64">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredReports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No reports found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {reports.length === 0
                    ? 'Start by creating a new audit report'
                    : 'Try adjusting your search filters'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Audit Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>NC Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => {
                      const ncStatus = calculateNCStatus(report);
                      return (
                        <TableRow key={report.reportId}>
                          <TableCell>
                            {report.reportId}
                          </TableCell>
                          <TableCell>{getProjectDisplay(report.project)}</TableCell>
                          <TableCell>{report.auditType}</TableCell>
                          <TableCell>
                            {new Date(report.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {ncStatus === 'green' ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">All Clear</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">NC Open</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedReport(report)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}