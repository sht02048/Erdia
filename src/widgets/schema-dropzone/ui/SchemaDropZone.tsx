"use client";

import { useState } from "react";

import { useSchema } from "@/features/schema-management";
import { AutoLayout } from "@/shared/lib/layout/auto-layout";
import { JsonSchemaParser } from "@/shared/lib/parsers/json-parser";

export default function SchemaDropZone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { loadSchema, setLoading, setError } = useSchema();

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

      // Load schema
      loadSchema(layoutedSchema, {
        fileName: file.name,
        isValid: true,
        uploadedAt: new Date(),
      });

      console.log("Schema loaded from drop zone:", layoutedSchema);
    } catch (error) {
      console.error("Drop zone error:", error);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.json')) {
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
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = "";
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-erd-bg-primary">
      <div className="max-w-md w-full mx-4">
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
            }
            ${isProcessing ? "opacity-50 pointer-events-none" : "cursor-pointer"}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('dropzone-file-input')?.click()}
        >
          <input
            id="dropzone-file-input"
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            
            {isProcessing ? (
              <div className="text-muted-foreground">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  <span className="text-lg font-medium">Processing...</span>
                </div>
                <div className="text-sm">Reading your schema file</div>
              </div>
            ) : (
              <div className="text-foreground">
                <div className="text-lg font-medium mb-2">Drop your schema file here</div>
                <div className="text-sm text-muted-foreground mb-2">
                  or click to browse
                </div>
                <div className="text-xs text-muted-foreground">
                  JSON format only • Max 5MB
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-erd-text-secondary">
          <h3 className="text-lg font-semibold mb-2 text-erd-text-primary">Welcome to Erdia</h3>
          <p className="text-sm">
            Upload your database schema to visualize entity relationships.
            Start by uploading a JSON schema file.
          </p>
        </div>
      </div>
    </div>
  );
}