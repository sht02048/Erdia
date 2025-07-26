"use client";

import { useRef } from "react";

interface UploadButtonProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function UploadButton({
  onFileSelect,
  isUploading = false,
  disabled = false,
  children,
  className = "",
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
    // Reset input value to allow re-uploading the same file
    e.target.value = "";
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled || isUploading}
        className={`bg-primary text-primary-foreground hover:bg-primary/90 border-primary inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
      >
        {isUploading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            Uploading...
          </>
        ) : (
          children
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.sql,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
