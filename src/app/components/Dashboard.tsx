import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, FolderOpen, Upload, Cloud, LogOut } from 'lucide-react';
import bexex from './image-logo/Bexex-logo.png';

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
      alert('Sync functionality will synchronize local data with server');
    } else {
      onNavigate(id as 'new-report' | 'submitted-reports' | 'upload-project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

          {/* Title */}
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Audit Management Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Welcome back! Select an option to continue
            </p>
          </div>

          {/* Logo (centered on tablet & desktop) */}
          <div className="flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <img
              src={bexex}
              alt="Logo"
              className="h-10 md:h-12 object-contain"
            />
          </div>

          {/* Logout */}
          <div className="flex justify-center md:justify-end">
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* MENU GRID */}
        <div className="flex justify-center">
          <div className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-1 
            gap-4 
            w-full 
            max-w-5xl
          ">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="px-4 md:px-6">
                    <div className="flex items-start gap-4">
                      <div className={`${item.color} p-3 rounded-lg`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>

                      <div>
                        <CardTitle className="text-base md:text-lg">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
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
    </div>
  );
}
