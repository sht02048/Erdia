import { Background, Controls, ReactFlow } from "@xyflow/react";

import { Schema } from "@/entities/table";
import { convertSchemaToFlowData } from "@/shared/lib/erd-utils";
import TableNode from "@/shared/ui/TableNode";
import SchemaDropZone from "@/widgets/schema-dropzone";

const nodeTypes = {
  tableNode: TableNode,
};

interface ErdFlowProps {
  schema: Schema | null;
}

export default function ErdFlowInner({ schema }: ErdFlowProps) {
  // Show empty state with drop zone if no schema
  if (!schema || schema.tables.length === 0) {
    return <SchemaDropZone />;
  }

  const { nodes, edges } = convertSchemaToFlowData(schema);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-erd-bg-primary"
      >
        <Background color="var(--erd-bg-tertiary)" />
        <Controls className="[&_button]:!bg-erd-bg-secondary [&_button]:!border-erd-border-primary [&_button]:!text-erd-text-primary [&_button:hover]:!bg-erd-bg-tertiary" />
      </ReactFlow>
    </div>
  );
}
