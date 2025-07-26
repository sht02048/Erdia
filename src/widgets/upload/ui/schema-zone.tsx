"use client";

import { useSchemaStore } from "@/shared/store/schema-store";
import SchemaDropZone from "@/widgets/schema-dropzone";
import SchemaStatus from "@/widgets/schema-status";

import { UploadTitle } from "./upload-title";

export function SchemaZone() {
  const { schema, isLoading, error } = useSchemaStore();

  const hasAppropriateSchema = !schema && !isLoading && !error;

  return (
    <div className="relative w-full max-w-2xl space-y-6 px-4">
      <UploadTitle />
      <SchemaDropZone />
      {!hasAppropriateSchema && <SchemaStatus />}
    </div>
  );
}
