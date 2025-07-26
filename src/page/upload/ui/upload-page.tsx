"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSchemaStore } from "@/shared/store/schema-store";
import { SchemaZone, UploadThemeButton, UploadTitle } from "@/widgets/upload/";

export default function UploadPage() {
  const router = useRouter();
  const { hasSchema } = useSchemaStore();

  useEffect(() => {
    if (hasSchema()) {
      router.push("/erd");
    }
  }, [hasSchema, router]);

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center">
      <UploadThemeButton />
      <UploadTitle />
      <SchemaZone />
    </div>
  );
}
