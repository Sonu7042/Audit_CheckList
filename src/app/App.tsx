import { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import NewReport from './components/NewReport';
import SubmittedReports from './components/SubmittedReports';
import UploadProjectData from './components/UploadProjectData';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'new-report' | 'submitted-reports' | 'upload-project'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const navigateTo = (view: 'dashboard' | 'new-report' | 'submitted-reports' | 'upload-project') => {
    setCurrentView(view);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {currentView === 'dashboard' && (
        <Dashboard onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'new-report' && (
        <NewReport onBack={() => navigateTo('dashboard')} />
      )}
      {currentView === 'submitted-reports' && (
        <SubmittedReports onBack={() => navigateTo('dashboard')} />
      )}
      {currentView === 'upload-project' && (
        <UploadProjectData onBack={() => navigateTo('dashboard')} />
      )}
    </div>
  );
}