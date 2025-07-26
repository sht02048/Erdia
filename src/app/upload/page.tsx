"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSchemaStore } from "@/shared/store/schema-store";
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
    <div className="bg-erd-bg-primary flex min-h-screen flex-col items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-erd-text-primary mb-4 text-4xl font-bold">
            Welcome to Erdia
          </h1>
          <p className="text-erd-text-secondary text-lg">
            Upload your JSON schema file to generate an Entity Relationship
            Diagram
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <SchemaDropZone />
          <SchemaStatus />
        </div>
      </div>
    </div>
  );
}
