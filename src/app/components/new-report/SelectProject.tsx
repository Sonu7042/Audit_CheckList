import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useState } from 'react';
import { CheckCircle2, Building2 } from 'lucide-react';

interface SelectProjectProps {
  selectedProject: string;
  onSelect: (project: string) => void;
  onNext: () => void;
}

const defaultProjects = [
  { id: 'PROJ001', name: 'Metro Rail Phase 2 - Mumbai', client: 'Mumbai Metro Rail Corporation' },
  { id: 'PROJ002', name: 'Highway NH-48 - Gujarat', client: 'National Highways Authority' },
  { id: 'PROJ003', name: 'Warehouse Construction - Pune', client: 'Logistics India Ltd' },
  { id: 'PROJ004', name: 'Bridge Construction - Delhi', client: 'Public Works Department' },
  { id: 'PROJ005', name: 'Residential Complex - Bangalore', client: 'Prestige Group' },
];

export default function SelectProject({ selectedProject, onSelect, onNext }: SelectProjectProps) {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    // Load uploaded projects from localStorage
    const uploadedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Combine default projects with uploaded projects
    const allProjects = [
      ...defaultProjects,
      ...uploadedProjects.map((project: any) => ({
        id: project.projectId,
        name: project.projectName,
        client: project.clientName,
      })),
    ];
    
    setProjects(allProjects);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Select Project</CardTitle>
        <p className="text-sm text-gray-600 mt-2">Choose the project for this audit report</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedProject === project.id
                  ? 'border-2 border-blue-600 bg-blue-50'
                  : 'border-2 border-transparent hover:border-gray-300'
              }`}
              onClick={() => onSelect(project.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm text-gray-600">{project.id}</h4>
                          <p className="mt-1">{project.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{project.client}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedProject === project.id && (
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 ml-2" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} disabled={!selectedProject}>
            NEXT →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}