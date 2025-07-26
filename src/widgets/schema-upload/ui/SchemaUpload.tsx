"use client";

import { useState } from "react";

import { useSchema } from "@/features/schema-management";
import { AutoLayout } from "@/shared/lib/layout/auto-layout";
import { JsonSchemaParser } from "@/shared/lib/parsers/json-parser";

export default function SchemaUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { loadSchema, setLoading, setError, clearSchema } = useSchema();

  const processFile = async (file: File) => {
    console.log("Processing file:", file.name);
    setIsProcessing(true);
    setLoading(true);

    try {
      // Read file content
      const content = await readFileContent(file);

      // Parse JSON
      const parser = new JsonSchemaParser();
      const schema = parser.parse(content);

      // Validate schema
      const errors = parser.validate(schema);
      if (errors.length > 0) {
        setError(`Schema validation failed: ${errors.join(", ")}`);
        return;
      }

      // Apply auto-layout if needed
      const layout = new AutoLayout();
      const layoutedSchema = layout.applyLayout(schema);

      // Load schema
      loadSchema(layoutedSchema, {
        fileName: file.name,
        isValid: true,
        uploadedAt: new Date(),
      });

      console.log("Schema loaded successfully:", layoutedSchema);
    } catch (error) {
      console.error("Upload error:", error);
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
    console.log("File input changed!", e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      console.log("Processing file from header:", file.name);
      processFile(file);
    }
    // Reset input
    e.target.value = "";
  };

  const handleClear = () => {
    clearSchema();
  };

  const _handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const _handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center gap-3">
      {/* Upload Button - Using label approach */}
      <label
        className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        style={{ zIndex: 1000 }}
      >
        {isProcessing ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            Processing...
          </>
        ) : (
          <>📁 Upload Schema</>
        )}
        <input
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          disabled={isProcessing}
        />
      </label>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-border rounded-md border px-4 py-2 text-sm font-medium transition-colors"
      >
        🗑️ Clear
      </button>
    </div>
  );
}
