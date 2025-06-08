import BusinessForm from '@/components/forms/business-form';
import type { GenerateMarketingPlanOutput } from "@/ai/flows/generate-marketing-plan";

interface HeroSectionProps {
  setGeneratedPlan: (plan: GenerateMarketingPlanOutput | null) => void;
  setIsLoadingPlan: (loading: boolean) => void;
}

export default function HeroSection({ setGeneratedPlan, setIsLoadingPlan }: HeroSectionProps) {
  return (
    <section id="hero-form" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-primary to-background text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6">
          Ваш персональный маркетинговый <span className="text-accent">ко-пилот</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Получите профессиональный маркетинговый план, созданный искусственным интеллектом специально для вашего бизнеса.
          Просто опишите свой проект, укажите бюджет и сроки.
        </p>
        <BusinessForm setGeneratedPlan={setGeneratedPlan} setIsLoadingPlan={setIsLoadingPlan} />
      </div>
    </section>
  );
}
