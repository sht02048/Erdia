"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

import { pathKeys } from "@/shared/config";
import { useSchemaStore } from "@/shared/store/schema-store";
import { SchemaZone, UploadThemeButton } from "@/widgets/upload/";

export default function UploadPage() {
  const router = useRouter();
  const { hasSchema } = useSchemaStore();

  useLayoutEffect(() => {
    if (hasSchema()) {
      router.push(pathKeys.erd);
    }
  }, [hasSchema, router]);

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center">
      <UploadThemeButton />
      <SchemaZone />
    </div>
  );
}
