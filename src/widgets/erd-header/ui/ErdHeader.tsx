"use client";

import { useRouter } from "next/navigation";

import { FileInputButton } from "@/features/schema-input";
import { pathKeys } from "@/shared/config";
import { useSchemaStore } from "@/shared/store/schema-store";
import { Button } from "@/shared/ui/shadcn/button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const TITLE = "Erdia";
const DESCRIPTION = "Interactive Entity Relationship Diagram";

export default function ErdHeader() {
  const router = useRouter();
  const { clearSchema } = useSchemaStore();

  const handleClear = () => {
    clearSchema();
    router.push(pathKeys.upload);
  };

  return (
    <div className="bg-card border-border border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-card-foreground text-2xl font-bold">{TITLE}</h1>
          <p className="text-muted-foreground">{DESCRIPTION}</p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <FileInputButton />
          <Button onClick={handleClear} variant={"destructive"}>
            🗑️ Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
