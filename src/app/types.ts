export interface Step {
  id: string;
  title: string;
  category: string;
  description: string;
  content: StepContent;
}

export interface StepContent {
  sections: Section[];
  examples?: Example[];
  tips?: string[];
  task?: string;
}

export interface Section {
  title?: string;
  items?: string[];
  description?: string;
}

export interface Example {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ProgressState {
  completedSteps: string[];
  currentStepId: string;
}
