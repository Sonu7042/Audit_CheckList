import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ReportData } from '../NewReport';

interface SubmissionConfirmationProps {
  reportData: ReportData;
  onEdit: () => void;
  onSubmit: () => void;
}

export default function SubmissionConfirmation({
  reportData,
  onEdit,
  onSubmit,
}: SubmissionConfirmationProps) {
  // Calculate statistics
  const responses = Object.values(reportData.responses);
  const totalChecks = responses.length;
  const conforming = responses.filter((r: any) => r.answer === 'Yes').length;
  const nonConforming = responses.filter((r: any) => r.answer === 'No').length;
  const notApplicable = responses.filter((r: any) => r.answer === 'NA').length;
  
  const ncClosed = responses.filter(
    (r: any) => r.answer === 'No' && r.closureAvailable === 'Yes'
  ).length;
  const ncOpen = responses.filter(
    (r: any) => r.answer === 'No' && r.closureAvailable === 'No'
  ).length;

  const reportNumber = `RPT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 5: Submission Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h2 className="text-center mb-4">AUDIT REPORT SUMMARY</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Report No:</span>
              <span>{reportNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Project:</span>
              <span>{reportData.project}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Audit Type:</span>
              <span>{reportData.auditType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-gray-600 mb-2">Total Checks</div>
              <div className="text-blue-600">{totalChecks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                <span className="text-gray-600">Conforming</span>
              </div>
              <div className="text-green-600">{conforming}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <XCircle className="w-4 h-4 mr-1 text-red-600" />
                <span className="text-gray-600">Non-Conforming</span>
              </div>
              <div className="text-red-600">{nonConforming}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-gray-600 mb-2">Not Applicable</div>
              <div className="text-gray-600">{notApplicable}</div>
            </CardContent>
          </Card>
        </div>

        {nonConforming > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                <h3 className="text-orange-900">NC Status</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Closed NCs:</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                    {ncClosed} ✓
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Open NCs:</span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
                    {ncOpen} ⚠
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="mb-3">Selected Activities:</h3>
          <div className="flex flex-wrap gap-2">
            {reportData.activities.map((activity) => (
              <span
                key={activity}
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onEdit}>
            ← EDIT
          </Button>
          <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
            CONFIRM SUBMIT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
