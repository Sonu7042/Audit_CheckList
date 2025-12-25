import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import SelectProject from './new-report/SelectProject';
import SelectAuditType from './new-report/SelectAuditType';
import SelectActivities from './new-report/SelectActivities';
import FillChecklist from './new-report/FillChecklist';
import SubmissionConfirmation from './new-report/SubmissionConfirmation';

interface NewReportProps {
  onBack: () => void;
}

export type ReportData = {
  project: string;
  auditType: string;
  activities: string[];
  responses: Record<string, any>;
};

export default function NewReport({ onBack }: NewReportProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<ReportData>({
    project: '',
    auditType: '',
    activities: [],
    responses: {},
  });

  const updateReportData = (key: keyof ReportData, value: any) => {
    setReportData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = () => {
    // Save to localStorage
    const reports = JSON.parse(localStorage.getItem('auditReports') || '[]');
    const newReport = {
      ...reportData,
      reportId: `RPT-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'submitted',
    };
    reports.push(newReport);
    localStorage.setItem('auditReports', JSON.stringify(reports));
    
    // Go back to dashboard
    onBack();
  };

  const steps = [
    { number: 1, title: 'Select Project' },
    { number: 2, title: 'Select Audit Type' },
    { number: 3, title: 'Select Activities' },
    { number: 4, title: 'Fill Checklist' },
    { number: 5, title: 'Submit' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="text-xs mt-2 text-center">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <SelectProject
              selectedProject={reportData.project}
              onSelect={(project) => updateReportData('project', project)}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <SelectAuditType
              project={reportData.project}
              selectedAuditType={reportData.auditType}
              onSelect={(auditType) => updateReportData('auditType', auditType)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <SelectActivities
              project={reportData.project}
              auditType={reportData.auditType}
              selectedActivities={reportData.activities}
              onSelect={(activities) => updateReportData('activities', activities)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <FillChecklist
              activities={reportData.activities}
              responses={reportData.responses}
              onUpdate={(responses) => updateReportData('responses', responses)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <SubmissionConfirmation
              reportData={reportData}
              onEdit={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
