"use client";

import { DragEvent, useCallback, useState } from "react";

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  error?: string | null;
  className?: string;
}

export default function FileDropZone({
  onFileSelect,
  isUploading = false,
  error,
  className = "",
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      } ${isUploading ? "pointer-events-none opacity-50" : ""} ${className} `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".json,.sql,.csv"
        onChange={handleFileInputChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        disabled={isUploading}
      />

      <div className="space-y-4">
        <div className="text-4xl">📁</div>

        {isUploading ? (
          <div className="text-muted-foreground">
            <div className="text-lg font-medium">Uploading...</div>
            <div className="text-sm">Processing your file</div>
          </div>
        ) : (
          <div className="text-foreground">
            <div className="text-lg font-medium">
              Drop your schema file here
            </div>
            <div className="text-muted-foreground text-sm">
              or click to browse
            </div>
          </div>
        )}

        <div className="text-muted-foreground text-xs">
          Supported formats: JSON, SQL, CSV (max 5MB)
        </div>

        {error && (
          <div className="text-destructive bg-destructive/10 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
