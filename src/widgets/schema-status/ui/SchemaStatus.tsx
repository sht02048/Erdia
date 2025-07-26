"use client";

import { useSchemaStore } from "@/shared/store/schema-store";

export default function SchemaStatus() {
  const { schema, isLoading, error, warnings } = useSchemaStore();

  if (!schema && !isLoading && !error) {
    return null;
  }

  return (
    <div className="bg-erd-bg-tertiary border-erd-border-secondary border-b px-4 py-2">
      {isLoading && (
        <div className="text-erd-text-secondary flex items-center gap-2 text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Processing schema...
        </div>
      )}

      {error && <div className="text-destructive text-sm">❌ {error}</div>}

      {schema && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="text-erd-text-secondary flex items-center gap-4">
              <span className="text-erd-text-primary">✅ Schema loaded</span>
              <span>
                📊 {schema.tables.length} tables, {schema.relationships.length}{" "}
                relationships
              </span>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="text-sm text-amber-600">
              ⚠️ {warnings.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
