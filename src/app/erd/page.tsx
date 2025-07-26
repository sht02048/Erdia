"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ErdPage from "@/page/erd";
import { useSchemaStore } from "@/shared/store/schema-store";

export default function ErdRoute() {
  const router = useRouter();
  const { hasSchema } = useSchemaStore();

  useEffect(() => {
    if (!hasSchema()) {
      router.push("/upload");
    }
  }, [hasSchema, router]);

  if (!hasSchema()) {
    return null;
  }

  return <ErdPage />;
}
