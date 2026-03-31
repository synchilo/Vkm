import { useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { Sidebar } from './components/Sidebar';
import { StepContent } from './components/StepContent';
import { StepNavigation } from './components/StepNavigation';
import { steps, categories } from './data/steps';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProgressState } from './types';

export default function App() {
  const [progressState, setProgressState] = useLocalStorage<ProgressState>('vk-guide-progress', {
    completedSteps: [],
    currentStepId: steps[0].id
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const savedIndex = steps.findIndex(step => step.id === progressState.currentStepId);
    return savedIndex >= 0 ? savedIndex : 0;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Все шаги');

  const currentStep = steps[currentStepIndex];
  const isCurrentStepCompleted = progressState.completedSteps.includes(currentStep.id);

  const handleToggleComplete = () => {
    setProgressState(prev => {
      const isCompleted = prev.completedSteps.includes(currentStep.id);
      return {
        ...prev,
        completedSteps: isCompleted
          ? prev.completedSteps.filter(id => id !== currentStep.id)
          : [...prev.completedSteps, currentStep.id]
      };
    });
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      setProgressState(prev => ({
        ...prev,
        currentStepId: steps[newIndex].id
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      setProgressState(prev => ({
        ...prev,
        currentStepId: steps[newIndex].id
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
    setProgressState(prev => ({
      ...prev,
      currentStepId: steps[index].id
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        completedStepIds={progressState.completedSteps}
        onSelectStep={handleSelectStep}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProgressBar
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          completedSteps={progressState.completedSteps.length}
        />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
            <StepContent
              step={currentStep}
              isCompleted={isCurrentStepCompleted}
            />
          </div>
        </div>

        <StepNavigation
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToggleComplete={handleToggleComplete}
          isCompleted={isCurrentStepCompleted}
        />
      </div>
    </div>
  );
}