"use client";

import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";

import { useSchemaStore } from "@/shared/store/schema-store";

import ErdFlowInner from "./ErdFlowInner";

export default function ErdFlow() {
  const { schema } = useSchemaStore();

  return (
    <ReactFlowProvider>
      <ErdFlowInner schema={schema} />
    </ReactFlowProvider>
  );
}
