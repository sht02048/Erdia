"use client";

import { useInputProcess } from "@/features/schema-input/hooks/useInputProcess";
import { Button } from "@/shared/ui/shadcn/button";

export function FileInputButton() {
  const { processFile, isProcessing } = useInputProcess();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile({ file });
    }
    e.target.value = "";
  };

  return (
    <Button
      variant="secondary"
      disabled={isProcessing}
      className="border-border hover:bg-accent hover:text-accent-foreground cursor-pointer border"
      asChild
    >
      <label className="cursor-pointer">
        {isProcessing ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            Processing...
          </>
        ) : (
          <>📁 Upload New Schema</>
        )}
        <input
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          disabled={isProcessing}
        />
      </label>
    </Button>
  );
}
