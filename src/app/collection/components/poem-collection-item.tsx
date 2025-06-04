"use client";

import type { SavedPoem } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image"; // Using next/image, assuming data URLs are small or for limited use.

interface PoemCollectionItemProps {
  poem: SavedPoem;
  onDelete: (id: string) => void;
}

export function PoemCollectionItem({ poem, onDelete }: PoemCollectionItemProps) {
  return (
    <Card className="shadow-md overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          {/* Using img tag for simplicity with data URLs from localStorage if next/image causes issues without loader config for data URIs */}
          {/* For this example, we'll attempt with next/image. Ensure your next.config.js might need adjustments for data URIs if many/large. */}
          {/* Or, use standard <img /> tag: <img src={poem.imageDataUrl} alt="Saved poem visual" className="object-cover w-full h-full" /> */}
          <Image 
            src={poem.imageDataUrl} 
            alt="Saved poem visual" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="illustration poetry"
            unoptimized={poem.imageDataUrl.startsWith('data:')} // Important for data URLs with next/image
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2 sr-only">Poem</CardTitle>
        <pre className="whitespace-pre-wrap font-body text-sm text-foreground leading-relaxed">
          {poem.poem}
        </pre>
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <div className="flex justify-between items-center w-full">
          <p className="text-xs text-muted-foreground">
            Saved: {new Date(poem.createdAt).toLocaleDateString()}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(poem.id)}
            aria-label="Delete poem"
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
