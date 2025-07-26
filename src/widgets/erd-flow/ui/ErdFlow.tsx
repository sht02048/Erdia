"use client";

import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { redirect } from "next/navigation";

import { pathKeys } from "@/shared/config";
import { useSchemaStore } from "@/shared/store/schema-store";

import ErdFlowInner from "./ErdFlowInner";

export default function ErdFlow() {
  const { schema } = useSchemaStore();

  if (schema === null) {
    redirect(pathKeys.upload);
  }

  return (
    <ReactFlowProvider>
      <ErdFlowInner schema={schema} />
    </ReactFlowProvider>
  );
}
