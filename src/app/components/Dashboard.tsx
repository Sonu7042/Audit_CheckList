import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, FolderOpen, Upload, Cloud, LogOut } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: 'dashboard' | 'new-report' | 'submitted-reports' | 'upload-project') => void;
  onLogout: () => void;
}

export default function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const menuItems = [
    {
      id: 'new-report' as const,
      title: 'NEW REPORT',
      description: 'Start a new audit report',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      id: 'submitted-reports' as const,
      title: 'SUBMITTED REPORTS',
      description: 'View all submitted audit reports',
      icon: FolderOpen,
      color: 'bg-green-500',
    },
    {
      id: 'upload-project' as const,
      title: 'UPLOAD PROJECT DATA',
      description: 'Add new project information',
      icon: Upload,
      color: 'bg-purple-500',
    },
    {
      id: 'sync' as const,
      title: 'SYNC TO SERVER',
      description: 'Synchronize local data with server',
      icon: Cloud,
      color: 'bg-orange-500',
    },
  ];

  const handleClick = (id: string) => {
    if (id === 'sync') {
      // Handle sync functionality
      alert('Sync functionality will synchronize local data with server');
    } else {
      onNavigate(id as 'new-report' | 'submitted-reports' | 'upload-project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 bg-[rgba(255,242,203,0)]">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-gray-800">Audit Management Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Select an option to continue</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleClick(item.id)}
              >
                <CardHeader>
                  <div className="flex items-start space-x-4 bg-[rgba(243,9,9,0)] px-[39px] py-[0px]">
                    <div className={`${item.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
