"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "./shadcn/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="border-border inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors">
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <Button
      variant={"secondary"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border-border hover:bg-accent hover:text-accent-foreground cursor-pointer border"
    >
      {theme === "dark" ? (
        <>
          <span className="h-4 w-4">☀️</span>
          Light
        </>
      ) : (
        <>
          <span className="h-4 w-4">🌙</span>
          Dark
        </>
      )}
    </Button>
  );
}
