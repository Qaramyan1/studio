import Link from 'next/link';
import { Github, BookText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 bg-primary text-primary-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Marketing CoPilot. Все права защищены.
        </p>
        <div className="flex items-center space-x-6">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-accent transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="/docs" target="_blank" rel="noopener noreferrer" aria-label="Documentation" className="text-muted-foreground hover:text-accent transition-colors">
            <BookText className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
