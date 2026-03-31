import { Step } from '../types';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  steps: Step[];
  currentStepIndex: number;
  completedStepIds: string[];
  onSelectStep: (index: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export function Sidebar({
  steps,
  currentStepIndex,
  completedStepIds,
  onSelectStep,
  selectedCategory,
  onSelectCategory,
  categories
}: SidebarProps) {
  const filteredSteps = selectedCategory === 'Все шаги'
    ? steps
    : steps.filter(step => step.category === selectedCategory);

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto h-screen sticky top-0">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Категории</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <h2 className="font-semibold mb-4">Шаги</h2>
        <div className="space-y-2">
          {filteredSteps.map((step, index) => {
            const globalIndex = steps.findIndex(s => s.id === step.id);
            const isCompleted = completedStepIds.includes(step.id);
            const isCurrent = globalIndex === currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(globalIndex)}
                className={cn(
                  'w-full text-left p-3 rounded-lg transition-colors',
                  isCurrent
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                )}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-sm font-medium truncate',
                      isCurrent && 'text-blue-700'
                    )}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.category}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
