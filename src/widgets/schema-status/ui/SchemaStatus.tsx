"use client";

import { useSchemaStore } from "@/shared/store/schema-store";

export default function SchemaStatus() {
  const { schema, isLoading, error } = useSchemaStore();

  return (
    <div className="bg-muted border-border border-b px-4 py-2">
      {isLoading && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Processing schema...
        </div>
      )}

      {error && <div className="text-destructive text-sm">❌ {error}</div>}

      {schema && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground flex items-center gap-4">
              <span className="text-foreground">✅ Schema loaded</span>
              <span>
                📊 {schema.tables.length} tables, {schema.relationships.length}{" "}
                relationships
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
