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
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <MiniMap
          className="!bg-white"
          nodeColor="#3b82f6"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}
