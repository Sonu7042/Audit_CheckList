import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface SelectActivitiesProps {
  project: string;
  auditType: string;
  selectedActivities: string[];
  onSelect: (activities: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const activities = [
  'Excavation Work',
  'Working at Height',
  'Hot Work (Welding/Cutting)',
  'Scaffolding Work',
  'Electrical Work',
  'Lifting Operations',
  'Confined Space Entry',
  'Concrete Work',
  'Steel Erection',
  'Demolition Work',
];

export default function SelectActivities({
  project,
  auditType,
  selectedActivities,
  onSelect,
  onNext,
  onBack,
}: SelectActivitiesProps) {
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      onSelect(selectedActivities.filter((a) => a !== activity));
    } else {
      onSelect([...selectedActivities, activity]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 3: Select Activities Being Performed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg space-y-1">
          <p className="text-sm text-gray-600">Project: <span className="text-gray-900">{project}</span></p>
          <p className="text-sm text-gray-600">Audit Type: <span className="text-gray-900">{auditType}</span></p>
        </div>

        <div className="space-y-4">
          <Label>Select all activities that apply:</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity) => (
              <div key={activity} className="flex items-center space-x-2">
                <Checkbox
                  id={activity}
                  checked={selectedActivities.includes(activity)}
                  onCheckedChange={() => toggleActivity(activity)}
                />
                <Label
                  htmlFor={activity}
                  className="cursor-pointer"
                >
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            ← BACK
          </Button>
          <Button onClick={onNext} disabled={selectedActivities.length === 0}>
            NEXT →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
