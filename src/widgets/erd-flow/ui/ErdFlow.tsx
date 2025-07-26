"use client";

import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";

import { useSchema } from "@/features/schema-management";

import ErdFlowInner from "./ErdFlowInner";

export default function ErdFlow() {
  const { state } = useSchema();

  return (
    <ReactFlowProvider>
      <ErdFlowInner schema={state.schema} />
    </ReactFlowProvider>
  );
}
