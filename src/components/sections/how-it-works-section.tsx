import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, CheckSquare } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Расскажите о себе',
    description: 'Заполните простую форму, описав ваш бизнес, цели, бюджет и желаемые сроки.',
    bgColor: 'bg-secondary',
  },
  {
    icon: Lightbulb,
    title: 'Получите план',
    description: 'Наш AI проанализирует ваши данные и сгенерирует персонализированный маркетинговый план.',
    bgColor: 'bg-secondary',
  },
  {
    icon: CheckSquare,
    title: 'Следуйте шагам',
    description: 'Реализуйте предложенные стратегии и тактики для достижения максимальных результатов.',
    bgColor: 'bg-secondary',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">
          Как это работает?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Всего три простых шага отделяют вас от эффективной маркетинговой стратегии.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-lg border-border bg-card hover:shadow-accent/20 transition-shadow duration-300">
              <CardHeader>
                <div className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} mb-6`}>
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
