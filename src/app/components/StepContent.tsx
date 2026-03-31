import { Step } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Lightbulb, Target } from 'lucide-react';

interface StepContentProps {
  step: Step;
  isCompleted: boolean;
}

export function StepContent({ step, isCompleted }: StepContentProps) {
  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Badge className="mb-2">{step.category}</Badge>
          <h1 className="text-3xl font-bold mb-2">{step.title}</h1>
          <p className="text-gray-600">{step.description}</p>
        </div>
        <div className="ml-4">
          {isCompleted ? (
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          ) : (
            <Circle className="w-8 h-8 text-gray-300" />
          )}
        </div>
      </div>

      {/* Основной контент */}
      {step.content.sections.map((section, idx) => (
        <Card key={idx}>
          <CardHeader>
            {section.title && <CardTitle>{section.title}</CardTitle>}
          </CardHeader>
          <CardContent className="space-y-3">
            {section.description && (
              <p className="text-gray-700 mb-4">{section.description}</p>
            )}
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Примеры */}
      {step.content.examples && step.content.examples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Примеры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step.content.examples.map((example, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-semibold">{example.title}</h4>
                <p className="text-sm text-gray-600">{example.description}</p>
                {example.imageUrl && (
                  <img
                    src={example.imageUrl}
                    alt={example.title}
                    className="w-full rounded-lg shadow-md max-h-96 object-cover"
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Советы */}
      {step.content.tips && step.content.tips.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Полезные советы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {step.content.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">💡</span>
                  <span className="flex-1 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Задание */}
      {step.content.task && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Ваше задание
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{step.content.task}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
