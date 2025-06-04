import Link from "next/link";
import { BookOpenText, GalleryHorizontalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="py-4 px-6 border-b border-border/60 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-headline font-semibold text-foreground hover:text-accent transition-colors">
          <BookOpenText className="w-6 h-6 text-accent" />
          Picture Poet
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/collection" className="flex items-center gap-2">
              <GalleryHorizontalEnd className="w-5 h-5" />
              My Collection
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
