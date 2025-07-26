"use client";

import { useRouter } from "next/navigation";

import { useSchemaStore } from "@/shared/store/schema-store";
import SchemaUpload from "@/widgets/schema-upload";

const TITLE = "Erdia";
const DESCRIPTION = "Interactive Entity Relationship Diagram";

export default function ErdHeader() {
  const router = useRouter();
  const { clearSchema } = useSchemaStore();

  const handleClear = () => {
    clearSchema();
    router.push("/upload");
  };

  return (
    <div className="bg-erd-bg-secondary border-erd-border-secondary border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-erd-text-primary text-2xl font-bold">{TITLE}</h1>
          <p className="text-erd-text-secondary">{DESCRIPTION}</p>
        </div>

        <div className="flex items-center gap-3">
          <SchemaUpload />
          <button
            onClick={handleClear}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
