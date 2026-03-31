import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onToggleComplete: () => void;
  isCompleted: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onToggleComplete,
  isCompleted
}: StepNavigationProps) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={onPrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Предыдущий шаг
          </Button>

          <Button
            onClick={onToggleComplete}
            variant={isCompleted ? 'secondary' : 'default'}
            className="gap-2"
          >
            {isCompleted ? '✓ Выполнено' : 'Отметить выполненным'}
          </Button>

          <Button
            onClick={onNext}
            disabled={currentStep === totalSteps - 1}
            className="gap-2"
          >
            Следующий шаг
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
