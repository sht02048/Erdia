"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AutoLayout } from "@/shared/lib/layout/auto-layout";
import { JsonSchemaParser } from "@/shared/lib/parsers/json-parser";
import { useSchemaStore } from "@/shared/store/schema-store";

export default function SchemaDropZone() {
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setSchema, setLoading, setError, setWarnings } = useSchemaStore();

  const processFile = async (file: File) => {
    console.log("Drop zone processing file:", file.name);
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

      // Set warnings for auto-layout
      const hasPositions = schema.tables.some((table) => table.position);
      const warnings = hasPositions
        ? []
        : [
            "Auto-layout applied - table positions were generated automatically",
          ];

      // Load schema and redirect
      setSchema(layoutedSchema);
      setWarnings(warnings);

      console.log("Schema loaded from drop zone:", layoutedSchema);

      // Redirect to ERD page
      router.push("/erd");
    } catch (error) {
      console.error("Drop zone error:", error);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".json")) {
      processFile(file);
    } else {
      setError("Please upload a JSON file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Drop zone file input changed!", e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      console.log("Processing file from drop zone:", file.name);
      processFile(file);
    }
    e.target.value = "";
  };

  return (
    <div className="bg-background flex h-full w-full items-center justify-center">
      <div className="mx-4 w-full max-w-md">
        <label
          className={`relative block cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          } ${isProcessing ? "pointer-events-none opacity-50" : ""} `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            disabled={isProcessing}
          />

          <div className="space-y-4">
            <div className="text-4xl">📁</div>

            {isProcessing ? (
              <div className="text-muted-foreground">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  <span className="text-lg font-medium">Processing...</span>
                </div>
                <div className="text-sm">Reading your schema file</div>
              </div>
            ) : (
              <div className="text-foreground">
                <div className="mb-2 text-lg font-medium">
                  Drop your schema file here
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  or click to browse
                </div>
                <div className="text-muted-foreground text-xs">
                  JSON format only • Max 5MB
                </div>
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
