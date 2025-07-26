"use client";

import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";

import { Schema } from "@/entities/table";

import ErdFlowInner from "./ErdFlowInner";

interface ErdFlowProps {
  schema: Schema;
}

export default function ErdFlow({ schema }: ErdFlowProps) {
  return (
    <ReactFlowProvider>
      <ErdFlowInner schema={schema} />
    </ReactFlowProvider>
  );
}
