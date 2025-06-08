// src/components/layout/header.tsx
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by only rendering Sheet on client
  if (!isMounted) {
    // Fallback for SSR or before hydration (optional, can be null)
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Rocket className="h-7 w-7 text-accent" />
            <span>Marketing CoPilot</span>
          </Link>
          <div className="md:hidden">
             <Button variant="ghost" size="icon" disabled>
                <Menu className="h-6 w-6" />
             </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground">
              <a href="#hero-form">Запустить</a>
            </Button>
            <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground">
              <a href="#how-it-works">Как это работает</a>
            </Button>
            <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground">
              <a href="#benefits">Преимущества</a>
            </Button>
            <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground">
              <a href="#plan-preview">Пример плана</a>
            </Button>
          </nav>
        </div>
      </header>
    );
  }
  
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <SheetClose asChild>
      <Button asChild variant="ghost" className="justify-start w-full text-left hover:bg-accent/20 hover:text-accent-foreground">
        <a href={href}>{children}</a>
      </Button>
    </SheetClose>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Rocket className="h-7 w-7 text-accent" />
          <span>Marketing CoPilot</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground px-3 py-2">
            <a href="#hero-form">Запустить</a>
          </Button>
          <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground px-3 py-2">
            <a href="#how-it-works">Как это работает</a>
          </Button>
          <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground px-3 py-2">
            <a href="#benefits">Преимущества</a>
          </Button>
          <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent-foreground px-3 py-2">
            <a href="#plan-preview">Пример плана</a>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-primary text-primary-foreground p-0">
              <div className="p-6">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-8">
                    <Rocket className="h-7 w-7 text-accent" />
                    <span>Marketing CoPilot</span>
                  </Link>
                </SheetClose>
                <nav className="flex flex-col space-y-3">
                   <NavLink href="#hero-form">Запустить</NavLink>
                   <NavLink href="#how-it-works">Как это работает</NavLink>
                   <NavLink href="#benefits">Преимущества</NavLink>
                   <NavLink href="#plan-preview">Пример плана</NavLink>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
