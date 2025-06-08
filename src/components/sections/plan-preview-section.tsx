"use client";
import { useEffect, useState } from 'react';
import type { PreviewMarketingPlanOutput } from '@/ai/flows/preview-marketing-plan';
import type { GenerateMarketingPlanOutput } from '@/ai/flows/generate-marketing-plan';
import { previewMarketingPlan } from '@/ai/flows/preview-marketing-plan';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PlanPreviewSectionProps {
  generatedPlan: GenerateMarketingPlanOutput | null;
  isLoadingPlan: boolean;
}

export default function PlanPreviewSection({ generatedPlan, isLoadingPlan }: PlanPreviewSectionProps) {
  const [initialPreview, setInitialPreview] = useState<PreviewMarketingPlanOutput | null>(null);
  const [isLoadingInitialPreview, setIsLoadingInitialPreview] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch initial preview if no user-generated plan and not currently loading one
    if (!generatedPlan && !isLoadingPlan) {
      const fetchPreview = async () => {
        setIsLoadingInitialPreview(true);
        setErrorState(null);
        try {
          const preview = await previewMarketingPlan({
            businessDescription: 'Инновационный SaaS продукт для управления проектами, ориентированный на малый и средний бизнес.',
            budget: 5000,
            timelineDays: 90,
          });
          setInitialPreview(preview);
        } catch (error) {
          console.error("Error fetching initial plan preview:", error);
          setErrorState("Не удалось загрузить пример плана. Пожалуйста, обновите страницу.");
          setInitialPreview(null); // Ensure no stale data
        }
        setIsLoadingInitialPreview(false);
      };
      fetchPreview();
    } else if (generatedPlan) {
      // If a user-generated plan is now available, clear initial preview and its loading/error states
      setInitialPreview(null);
      setIsLoadingInitialPreview(false);
      setErrorState(null);
    }
  }, [generatedPlan, isLoadingPlan]);

  const displayPlanText = generatedPlan?.marketingPlan || initialPreview?.marketingPlanPreview;
  const currentPlanTitle = generatedPlan ? "Ваш Маркетинговый План" : "Пример Маркетингового Плана";
  const isLoading = isLoadingPlan || (!generatedPlan && isLoadingInitialPreview);

  // Improved parser for plan text into accordion items
  const parsePlanToAccordionItems = (planText: string | undefined) => {
    if (!planText) return [];
    // Split by common markdown list markers or double newlines (paragraphs)
    const sections = planText.split(/\n\s*\n|\n(?=\s*[-*#]+\s*|\s*\d+\.\s*)/);
    
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      let trigger = lines[0].replace(/^[-*#\d\.]+\s*/, '').trim();
      if (trigger.length > 100) trigger = trigger.substring(0, 100) + "..."; // Truncate long triggers
      if (!trigger) trigger = `Раздел ${index + 1}`;
      
      const content = lines.length > 1 ? lines.slice(1).join('\n').trim() : "Подробности в основном тексте раздела.";
      
      return {
        id: `item-${index}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID
        trigger: trigger,
        content: content || "Нет дополнительной информации.",
      };
    }).filter(item => item.trigger && item.content);
  };
  
  const accordionItems = parsePlanToAccordionItems(displayPlanText);

  return (
    <section id="plan-preview" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">{currentPlanTitle}</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          {generatedPlan ? "Вот ваш персонализированный маркетинговый план. Используйте его как руководство для достижения ваших целей." : "Взгляните на пример маркетингового плана, который может быть создан для вашего бизнеса."}
        </p>

        <Card className="bg-card shadow-xl border-border min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">{currentPlanTitle}</CardTitle>
            {generatedPlan && <CardDescription>Сгенерировано специально для вас.</CardDescription>}
            {!generatedPlan && !isLoadingInitialPreview && initialPreview && <CardDescription>Общий пример для демонстрации.</CardDescription>}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4 p-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full mt-2" />
              </div>
            ) : errorState && !generatedPlan ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ошибка Загрузки</AlertTitle>
                <AlertDescription>{errorState}</AlertDescription>
              </Alert>
            ) : displayPlanText ? (
              accordionItems.length > 0 ? (
                 <Accordion type="multiple" className="w-full text-foreground">
                  {accordionItems.map((item) => (
                    <AccordionItem value={item.id} key={item.id}>
                      <AccordionTrigger className="text-left hover:no-underline text-lg data-[state=open]:text-accent py-4">
                        {item.trigger}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground whitespace-pre-line text-base pb-4">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                 <pre className="whitespace-pre-wrap text-sm text-muted-foreground p-4 bg-secondary rounded-md overflow-x-auto">{displayPlanText}</pre>
              )
            ) : (
              <p className="text-muted-foreground p-4">План не доступен в данный момент. Попробуйте сгенерировать новый.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
