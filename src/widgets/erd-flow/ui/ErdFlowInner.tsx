import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";

import { Schema } from "@/entities/table";
import { convertSchemaToFlowData } from "@/shared/lib/erd-utils";
import TableNode from "@/shared/ui/TableNode";

const nodeTypes = {
  tableNode: TableNode,
};

interface ErdFlowProps {
  schema: Schema;
}

export default function ErdFlowInner({ schema }: ErdFlowProps) {
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
        <MiniMap
          className="!bg-erd-bg-secondary !border-erd-border-primary"
          nodeColor="var(--erd-accent-primary)"
          maskColor="rgba(0, 0, 0, 0.3)"
        />
      </ReactFlow>
    </div>
  );
}
