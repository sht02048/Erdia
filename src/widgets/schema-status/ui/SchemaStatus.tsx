"use client";

import { useSchema } from "@/features/schema-management";

export default function SchemaStatus() {
  const { state } = useSchema();

  if (!state.schema && !state.isLoading && !state.metadata.errorMessage) {
    return null;
  }

  return (
    <div className="bg-erd-bg-tertiary border-erd-border-secondary border-b px-4 py-2">
      {state.isLoading && (
        <div className="text-erd-text-secondary flex items-center gap-2 text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Processing schema...
        </div>
      )}

      {state.metadata.errorMessage && (
        <div className="text-destructive text-sm">
          ❌ {state.metadata.errorMessage}
        </div>
      )}

      {state.schema && state.metadata.isValid && (
        <div className="flex items-center justify-between text-sm">
          <div className="text-erd-text-secondary flex items-center gap-4">
            <span className="text-erd-text-primary">✅ Schema loaded</span>
            {state.metadata.fileName && (
              <span>📄 {state.metadata.fileName}</span>
            )}
            <span>
              📊 {state.schema.tables.length} tables,{" "}
              {state.schema.relationships.length} relationships
            </span>
          </div>

          {state.metadata.uploadedAt && (
            <span className="text-erd-text-muted">
              {state.metadata.uploadedAt.toLocaleTimeString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
