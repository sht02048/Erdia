"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { pathKeys } from "@/shared/config";
import { useSchemaStore } from "@/shared/store/schema-store";

import { useInputProcess } from "../hooks";
import { Processing } from "./processing";

export function FileInputZone() {
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState(false);
  const { setError } = useSchemaStore();
  const { isProcessing, processFile } = useInputProcess();

  const onSuccess = () => {
    router.push(pathKeys.erd);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".json")) {
      processFile({ file, onSuccess });
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
      processFile({ file, onSuccess });
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
