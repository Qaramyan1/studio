import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Clock, Zap, TrendingUp } from 'lucide-react'; // Added TrendingUp icon

const benefits = [
  {
    icon: DollarSign,
    title: 'Ноль расходов на агентство',
    description: 'Экономьте тысячи на услугах дорогих маркетинговых агентств и фрилансеров.',
  },
  {
    icon: Clock,
    title: 'Готовый план за минуты', // Updated from 7 days
    description: 'Получите комплексный маркетинговый план почти мгновенно, а не через недели.',
  },
  {
    icon: Zap,
    title: 'Автоматизация процессов',
    description: 'ИИ берет на себя рутинные задачи по планированию, освобождая ваше время.',
  },
  {
    icon: TrendingUp,
    title: 'Рост бизнеса',
    description: 'Эффективные стратегии, направленные на привлечение клиентов и увеличение прибыли.',
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-12 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Преимущества Marketing CoPilot
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Откройте для себя новый уровень маркетинга с помощью искусственного интеллекта.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-background text-foreground shadow-lg border-border hover:border-accent transition-colors duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground mb-4">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
