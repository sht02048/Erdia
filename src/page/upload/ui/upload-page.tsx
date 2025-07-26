"use client";

import { redirect } from "next/navigation";

import { pathKeys } from "@/shared/config";
import { useSchemaStore } from "@/shared/store/schema-store";
import { SchemaZone, UploadThemeButton } from "@/widgets/upload/";

export default function UploadPage() {
  const { hasSchema } = useSchemaStore();

  if (hasSchema()) {
    redirect(pathKeys.erd);
  }

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center">
      <UploadThemeButton />
      <SchemaZone />
    </div>
  );
}
