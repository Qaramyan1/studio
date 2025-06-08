"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateMarketingPlan } from "@/ai/flows/generate-marketing-plan";
import type { GenerateMarketingPlanOutput, GenerateMarketingPlanInput } from "@/ai/flows/generate-marketing-plan";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  businessDescription: z.string().min(10, {
    message: "Описание бизнеса должно содержать не менее 10 символов.",
  }).max(5000, { message: "Описание бизнеса не должно превышать 5000 символов."}),
  budget: z.coerce.number().positive({
    message: "Бюджет должен быть положительным числом.",
  }),
  timelineDays: z.coerce.number().int().positive({
    message: "Горизонт должен быть положительным целым числом дней.",
  }).min(1, { message: "Минимальный горизонт - 1 день."}).max(365, { message: "Максимальный горизонт - 365 дней."}),
});

type BusinessFormValues = z.infer<typeof formSchema>;

interface BusinessFormProps {
  setGeneratedPlan: (plan: GenerateMarketingPlanOutput | null) => void;
  setIsLoadingPlan: (loading: boolean) => void;
}

export default function BusinessForm({ setGeneratedPlan, setIsLoadingPlan }: BusinessFormProps) {
  const { toast } = useToast();
  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: "",
      budget: 1000,
      timelineDays: 30,
    },
  });

  const {formState: {isSubmitting}} = form;

  async function onSubmit(values: BusinessFormValues) {
    setIsLoadingPlan(true);
    setGeneratedPlan(null); // Clear previous plan
    try {
      const input: GenerateMarketingPlanInput = {
        businessDescription: values.businessDescription,
        budget: values.budget,
        timeline: values.timelineDays,
      };
      const result = await generateMarketingPlan(input);
      setGeneratedPlan(result);
      toast({
        title: "План создан!",
        description: "Ваш маркетинговый план успешно сгенерирован.",
        variant: "default",
      });
      // Scroll to plan preview section
      const planPreviewElement = document.getElementById('plan-preview');
      if (planPreviewElement) {
        planPreviewElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Error generating marketing plan:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать маркетинговый план. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
      setGeneratedPlan(null);
    } finally {
      setIsLoadingPlan(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="businessDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Описание бизнеса</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите о вашем бизнесе, продуктах/услугах, целевой аудитории и УТП..."
                  className="resize-y min-h-[120px] bg-input border-border focus:ring-accent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Бюджет (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000" className="bg-input border-border focus:ring-accent" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timelineDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Горизонт (дней)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" className="bg-input border-border focus:ring-accent" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Создание плана...
            </>
          ) : (
            "Создать план"
          )}
        </Button>
      </form>
    </Form>
  );
}
