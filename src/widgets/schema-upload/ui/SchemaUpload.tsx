"use client";

import { useRef, useState } from "react";

import { useSchema } from "@/features/schema-management";
import { AutoLayout } from "@/shared/lib/layout/auto-layout";
import { JsonSchemaParser } from "@/shared/lib/parsers/json-parser";

export default function SchemaUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      setError(error instanceof Error ? error.message : "Failed to process file");
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
    // Reset input
    e.target.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
      {/* Upload Button */}
      <button
        onClick={handleUploadClick}
        disabled={isProcessing}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 border border-primary rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            📁 Upload Schema
          </>
        )}
      </button>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-border rounded-md transition-colors"
      >
        🗑️ Clear
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}