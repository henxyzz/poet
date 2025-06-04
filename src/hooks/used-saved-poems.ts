"use client";

import type { SavedPoem } from "@/types";
import { useState, useEffect, useCallback } from "react";

const SAVED_POEMS_KEY = "picturePoet_savedPoems";

export function useSavedPoems() {
  const [savedPoems, setSavedPoems] = useState<SavedPoem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const items = localStorage.getItem(SAVED_POEMS_KEY);
        if (items) {
          setSavedPoems(JSON.parse(items));
        }
      } catch (error) {
        console.error("Failed to load poems from localStorage:", error);
        setSavedPoems([]);
      }
      setIsLoaded(true);
    }
  }, []);

  const savePoem = useCallback((imageDataUrl: string, poem: string) => {
    if (typeof window === "undefined") return;
    const newPoem: SavedPoem = {
      id: Date.now().toString(),
      imageDataUrl,
      poem,
      createdAt: new Date().toISOString(),
    };
    try {
      setSavedPoems((prevPoems) => {
        const updatedPoems = [newPoem, ...prevPoems];
        localStorage.setItem(SAVED_POEMS_KEY, JSON.stringify(updatedPoems));
        return updatedPoems;
      });
    } catch (error) {
      console.error("Failed to save poem to localStorage:", error);
    }
  }, []);

  const deletePoem = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    try {
      setSavedPoems((prevPoems) => {
        const updatedPoems = prevPoems.filter((p) => p.id !== id);
        localStorage.setItem(SAVED_POEMS_KEY, JSON.stringify(updatedPoems));
        return updatedPoems;
      });
    } catch (error) {
      console.error("Failed to delete poem from localStorage:", error);
    }
  }, []);

  return { savedPoems, savePoem, deletePoem, isLoaded };
}
