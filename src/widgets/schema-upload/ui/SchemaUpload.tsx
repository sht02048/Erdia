"use client";

import { useState } from "react";

import { AutoLayout } from "@/shared/lib/layout/auto-layout";
import { JsonSchemaParser } from "@/shared/lib/parsers/json-parser";
import { useSchemaStore } from "@/shared/store/schema-store";
import { Button } from "@/shared/ui/shadcn/button";

export default function SchemaUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { setSchema, setLoading, setError } = useSchemaStore();

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setLoading(true);

    try {
      const content = await readFileContent(file);

      const parser = new JsonSchemaParser();
      const schema = parser.parse(content);

      const errors = parser.validate(schema);
      if (errors.length > 0) {
        setError(`Schema validation failed: ${errors.join(", ")}`);
        return;
      }

      const layout = new AutoLayout();
      const layoutedSchema = layout.applyLayout(schema);

      setSchema(layoutedSchema);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to process file"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          resolve(content);
        } else {
          reject(new Error("Failed to read file content"));
        }
      };
      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsText(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
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
