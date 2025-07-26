"use client";

import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

import { pathKeys } from "@/shared/config";
import { useSchemaStore } from "@/shared/store/schema-store";

import ErdFlowInner from "./ErdFlowInner";

export default function ErdFlow() {
  const { schema } = useSchemaStore();
  const router = useRouter();

  useLayoutEffect(() => {
    if (schema === null) {
      router.push(pathKeys.upload);
    }
  }, [schema]);

  if (schema === null) return null;

  return (
    <ReactFlowProvider>
      <ErdFlowInner schema={schema} />
    </ReactFlowProvider>
  );
}
