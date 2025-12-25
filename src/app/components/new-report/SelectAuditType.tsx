import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, Shield, Flame, FileCheck, Zap, Leaf, ClipboardCheck } from 'lucide-react';

interface SelectAuditTypeProps {
  project: string;
  selectedAuditType: string;
  onSelect: (auditType: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const auditTypes = [
  { id: 'Safety Audit', name: 'Safety Audit', icon: Shield, color: 'bg-blue-100 text-blue-600' },
  { id: 'EHS Audit', name: 'EHS Audit', icon: Leaf, color: 'bg-green-100 text-green-600' },
  { id: 'IS 14489 Audit', name: 'IS 14489 Audit', icon: FileCheck, color: 'bg-purple-100 text-purple-600' },
  { id: 'Fire Safety Assessment', name: 'Fire Safety Assessment', icon: Flame, color: 'bg-red-100 text-red-600' },
  { id: 'Electrical Safety Audit', name: 'Electrical Safety Audit', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'Quality Audit', name: 'Quality Audit', icon: ClipboardCheck, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'Environmental Audit', name: 'Environmental Audit', icon: Leaf, color: 'bg-teal-100 text-teal-600' },
];

export default function SelectAuditType({
  project,
  selectedAuditType,
  onSelect,
  onNext,
  onBack,
}: SelectAuditTypeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2: Select Audit Type</CardTitle>
        <p className="text-sm text-gray-600 mt-2">Choose the type of audit to perform</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Selected Project:</p>
          <p>{project}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auditTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAuditType === type.id
                    ? 'border-2 border-blue-600 bg-blue-50'
                    : 'border-2 border-transparent hover:border-gray-300'
                }`}
                onClick={() => onSelect(type.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${type.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p>{type.name}</p>
                      </div>
                    </div>
                    {selectedAuditType === type.id && (
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            ← BACK
          </Button>
          <Button onClick={onNext} disabled={!selectedAuditType}>
            NEXT →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}