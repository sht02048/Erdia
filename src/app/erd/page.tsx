"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ErdPage from "@/page/erd";
import { useSchemaStore } from "@/shared/store/schema-store";

export default function ErdRoute() {
  const router = useRouter();
  const { hasSchema } = useSchemaStore();

  useEffect(() => {
    // If no schema is loaded, redirect to upload page
    if (!hasSchema()) {
      router.push("/upload");
    }
  }, [hasSchema, router]);

  // Don't render ERD if no schema
  if (!hasSchema()) {
    return null;
  }

  return <ErdPage />;
}
