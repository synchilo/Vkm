import { Progress } from './ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number;
}

export function ProgressBar({ currentStep, totalSteps, completedSteps }: ProgressBarProps) {
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-semibold">Гайд по оформлению ВК сообщества</h2>
            <p className="text-sm text-gray-600">
              Шаг {currentStep + 1} из {totalSteps}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {completedSteps} / {totalSteps} выполнено
            </p>
            <p className="text-xs text-gray-500">{Math.round(progressPercentage)}%</p>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
}
