import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Camera, CheckCircle2, XCircle } from 'lucide-react';

interface FillChecklistProps {
  activities: string[];
  responses: Record<string, any>;
  onUpdate: (responses: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Define questions for each activity
const activityQuestions: Record<string, string[]> = {
  'Excavation Work': [
    'Is excavation permit available at site?',
    'Are edges protected with barricades?',
    'Is safe access/egress provided?',
    'Is shoring/shuttering properly installed?',
    'Are utilities identified and marked?',
  ],
  'Working at Height': [
    'Is work at height permit available?',
    'Are workers using proper fall protection?',
    'Is the work area barricaded below?',
    'Are ladders and platforms in good condition?',
    'Is rescue plan in place?',
  ],
  'Hot Work (Welding/Cutting)': [
    'Is hot work permit available?',
    'Is fire extinguisher available nearby?',
    'Is the area cleared of combustibles?',
    'Are welders wearing proper PPE?',
    'Is fire watch assigned?',
  ],
  'Scaffolding Work': [
    'Is scaffolding inspection done?',
    'Are toe boards installed?',
    'Is access ladder properly secured?',
    'Are workers using harnesses?',
    'Is scaffolding tagged (Green/Red)?',
  ],
  'Electrical Work': [
    'Is electrical work permit available?',
    'Is LOTO procedure followed?',
    'Are insulated tools being used?',
    'Is qualified electrician present?',
    'Is voltage testing done before work?',
  ],
  'Lifting Operations': [
    'Is lifting plan available?',
    'Is lifting equipment certified?',
    'Is rigger/signalman available?',
    'Is area barricaded during lifting?',
    'Are daily checks documented?',
  ],
  'Confined Space Entry': [
    'Is confined space permit available?',
    'Is gas testing done before entry?',
    'Is standby person assigned?',
    'Is rescue equipment available?',
    'Is forced ventilation provided?',
  ],
  'Concrete Work': [
    'Is formwork inspection done?',
    'Are workers wearing safety shoes?',
    'Is vibrator in good condition?',
    'Are shuttering supports adequate?',
    'Is curing method identified?',
  ],
  'Steel Erection': [
    'Is steel erection plan available?',
    'Are connections properly secured?',
    'Is crane operator certified?',
    'Are workers using double lanyard?',
    'Is area below barricaded?',
  ],
  'Demolition Work': [
    'Is demolition plan available?',
    'Are utilities disconnected?',
    'Is dust suppression in place?',
    'Is debris removal planned?',
    'Are adjacent structures protected?',
  ],
};

export default function FillChecklist({
  activities,
  responses,
  onUpdate,
  onNext,
  onBack,
}: FillChecklistProps) {
  const [activeTab, setActiveTab] = useState(activities[0]);
  const [isDraft, setIsDraft] = useState(false);

  const updateResponse = (activity: string, questionIndex: number, field: string, value: any) => {
    const key = `${activity}-${questionIndex}`;
    const currentResponse = responses[key] || {};
    const newResponses = {
      ...responses,
      [key]: { ...currentResponse, [field]: value },
    };
    onUpdate(newResponses);
  };

  const getResponse = (activity: string, questionIndex: number) => {
    const key = `${activity}-${questionIndex}`;
    return responses[key] || {};
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    setTimeout(() => setIsDraft(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 4: Fill Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${activities.length}, 1fr)` }}>
            {activities.map((activity) => (
              <TabsTrigger key={activity} value={activity} className="text-xs">
                {activity.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {activities.map((activity) => {
            const questions = activityQuestions[activity] || [];
            return (
              <TabsContent key={activity} value={activity} className="space-y-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3>{activity} Checklist</h3>
                </div>

                {questions.map((question, index) => {
                  const response = getResponse(activity, index);
                  return (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <Label className="text-base">Q{index + 1}. {question}</Label>
                        </div>

                        <RadioGroup
                          value={response.answer || ''}
                          onValueChange={(value) =>
                            updateResponse(activity, index, 'answer', value)
                          }
                        >
                          <div className="flex space-x-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id={`${activity}-${index}-yes`} />
                              <Label htmlFor={`${activity}-${index}-yes`} className="cursor-pointer">
                                <CheckCircle2 className="w-4 h-4 inline mr-1 text-green-600" />
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id={`${activity}-${index}-no`} />
                              <Label htmlFor={`${activity}-${index}-no`} className="cursor-pointer">
                                <XCircle className="w-4 h-4 inline mr-1 text-red-600" />
                                No
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="NA" id={`${activity}-${index}-na`} />
                              <Label htmlFor={`${activity}-${index}-na`} className="cursor-pointer">
                                NA
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>

                        {response.answer === 'Yes' && (
                          <div className="space-y-2 pl-4 border-l-2 border-green-500">
                            <Label className="text-sm text-gray-600">Upload Compliance Photo</Label>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" type="button">
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Photo
                              </Button>
                              {response.compliancePhoto && (
                                <span className="text-sm text-green-600">✓ Photo uploaded</span>
                              )}
                            </div>
                          </div>
                        )}

                        {response.answer === 'No' && (
                          <div className="space-y-4 pl-4 border-l-2 border-red-500">
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-600">Upload NC Photo</Label>
                              <Button variant="outline" size="sm" type="button">
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Photo
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm text-gray-600">NC Statement</Label>
                              <Textarea
                                placeholder="Describe the non-conformance..."
                                value={response.ncStatement || ''}
                                onChange={(e) =>
                                  updateResponse(activity, index, 'ncStatement', e.target.value)
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm text-gray-600">Closure Available?</Label>
                              <RadioGroup
                                value={response.closureAvailable || ''}
                                onValueChange={(value) =>
                                  updateResponse(activity, index, 'closureAvailable', value)
                                }
                              >
                                <div className="flex space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="Yes"
                                      id={`${activity}-${index}-closure-yes`}
                                    />
                                    <Label htmlFor={`${activity}-${index}-closure-yes`}>Yes</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="No"
                                      id={`${activity}-${index}-closure-no`}
                                    />
                                    <Label htmlFor={`${activity}-${index}-closure-no`}>No</Label>
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>

                            {response.closureAvailable === 'Yes' && (
                              <div className="space-y-4 bg-green-50 p-4 rounded">
                                <div className="space-y-2">
                                  <Label>Closure Action Taken</Label>
                                  <Textarea
                                    placeholder="Describe the closure action..."
                                    value={response.closureAction || ''}
                                    onChange={(e) =>
                                      updateResponse(activity, index, 'closureAction', e.target.value)
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Closure Evidence Photo</Label>
                                  <Button variant="outline" size="sm" type="button">
                                    <Camera className="w-4 h-4 mr-2" />
                                    Upload Photo
                                  </Button>
                                </div>
                              </div>
                            )}

                            {response.closureAvailable === 'No' && (
                              <div className="space-y-4 bg-orange-50 p-4 rounded">
                                <div className="space-y-2">
                                  <Label>Expected Closure Action</Label>
                                  <Textarea
                                    placeholder="Describe expected action..."
                                    value={response.expectedAction || ''}
                                    onChange={(e) =>
                                      updateResponse(activity, index, 'expectedAction', e.target.value)
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Expected Closure Date</Label>
                                  <Input
                                    type="date"
                                    value={response.expectedDate || ''}
                                    onChange={(e) =>
                                      updateResponse(activity, index, 'expectedDate', e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            ← BACK
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              {isDraft ? '✓ Saved' : 'SAVE DRAFT'}
            </Button>
            <Button onClick={onNext}>SUBMIT →</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
