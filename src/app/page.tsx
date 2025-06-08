"use client";

import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import BenefitsSection from '@/components/sections/benefits-section';
import PlanPreviewSection from '@/components/sections/plan-preview-section';
import Footer from '@/components/layout/footer';
import { useState } from 'react';
import type { GenerateMarketingPlanOutput } from '@/ai/flows/generate-marketing-plan';

export default function HomePage() {
  const [generatedPlan, setGeneratedPlan] = useState<GenerateMarketingPlanOutput | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16"> {/* Add padding-top to account for fixed header */}
        <HeroSection setGeneratedPlan={setGeneratedPlan} setIsLoadingPlan={setIsLoadingPlan} />
        <HowItWorksSection />
        <BenefitsSection />
        <PlanPreviewSection generatedPlan={generatedPlan} isLoadingPlan={isLoadingPlan} />
      </main>
      <Footer />
    </div>
  );
}
