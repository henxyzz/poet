"use client";

import { AppHeader } from "@/components/layout/app-header";
import { PoemCollectionItem } from "@/components/poem-collection-item";
import { Button } from "@/components/ui/button";
import { useSavedPoems } from "@/hooks/use-saved-poems";
import { FileText, Info } from "lucide-react";
import Link from "next/link";

export default function CollectionPage() {
  const { savedPoems, deletePoem, isLoaded } = useSavedPoems();

  if (!isLoaded) {
    return (
      <>
        <AppHeader />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          <h1 className="text-3xl font-headline mb-8 text-center">My Poem Collection</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card p-4 rounded-lg shadow-md animate-pulse">
                <div className="aspect-video bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }
  
  return (
    <>
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-headline mb-8 text-center text-foreground">My Poem Collection</h1>
        {savedPoems.length === 0 ? (
          <div className="text-center text-muted-foreground py-12 flex flex-col items-center">
            <FileText className="w-16 h-16 mb-4 text-accent" />
            <p className="text-xl mb-4 font-body">Your collection is empty.</p>
            <p className="mb-6 font-body">Go ahead and create some poetry from your pictures!</p>
            <Button asChild size="lg">
              <Link href="/">Generate a Poem</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPoems.map((poem) => (
              <PoemCollectionItem key={poem.id} poem={poem} onDelete={deletePoem} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
