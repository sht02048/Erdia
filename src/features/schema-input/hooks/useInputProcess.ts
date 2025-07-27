"use client";

import { useState } from "react";

import { AutoLayout, JsonSchemaParser } from "@/shared/lib/parsers";
import { useSchemaStore } from "@/shared/store/schema-store";

interface ProcessFileParams {
  file: File;
  onSuccess?: () => void;
}

export function useInputProcess() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { setSchema, setLoading, setError } = useSchemaStore();

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

  const processFile = async ({ file, onSuccess }: ProcessFileParams) => {
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
      onSuccess?.();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to process file"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, processFile };
}
