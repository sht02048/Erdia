"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSchemaStore } from "@/shared/store/schema-store";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import SchemaDropZone from "@/widgets/schema-dropzone";
import SchemaStatus from "@/widgets/schema-status";

export default function UploadPage() {
  const router = useRouter();
  const { hasSchema } = useSchemaStore();

  useEffect(() => {
    // If schema is already loaded, redirect to ERD page
    if (hasSchema()) {
      router.push("/erd");
    }
  }, [hasSchema, router]);

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center">
      {/* Theme toggle in top right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Title positioned absolutely above dropzone */}
      <div className="absolute top-1/2 left-1/2 -mt-42 w-150 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          Welcome to Erdia
        </h1>
        <p className="text-muted-foreground text-lg">
          Upload your JSON schema file to generate an Entity Relationship
          Diagram
        </p>
      </div>

      {/* Dropzone centered on the page */}
      <div className="w-full max-w-2xl space-y-6 px-4">
        <SchemaDropZone />
        <SchemaStatus />
      </div>
    </div>
  );
}
