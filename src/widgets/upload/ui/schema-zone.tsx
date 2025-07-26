"use client";

import { useSchemaStore } from "@/shared/store/schema-store";
import SchemaDropZone from "@/widgets/schema-dropzone";
import SchemaStatus from "@/widgets/schema-status";

export function SchemaZone() {
  const { schema, isLoading, error } = useSchemaStore();

  const hasAppropriateSchema = !schema && !isLoading && !error;

  return (
    <div className="w-full max-w-2xl space-y-6 px-4">
      <SchemaDropZone />
      {!hasAppropriateSchema && <SchemaStatus />}
    </div>
  );
}
