import { useRouter } from "next/router";
import { useState } from "react";

import { AutoLayout, JsonSchemaParser } from "@/shared/lib/parsers";
import { useSchemaStore } from "@/shared/store/schema-store";

import { Processing } from "./processing";

export function FileInputZone() {
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState(false);
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

      router.push("/erd");
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
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = "";
  };

  return (
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

        <Processing isProcessing={isProcessing} />
      </label>
    </div>
  );
}
