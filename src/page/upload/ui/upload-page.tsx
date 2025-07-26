"use client";

import { redirect } from "next/navigation";

import { useSchemaStore } from "@/shared/store/schema-store";
import { SchemaZone, UploadThemeButton, UploadTitle } from "@/widgets/upload/";

export default function UploadPage() {
  const { hasSchema } = useSchemaStore();

  if (hasSchema()) {
    redirect("/erd");
  }

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center">
      <UploadThemeButton />
      <UploadTitle />
      <SchemaZone />
    </div>
  );
}
