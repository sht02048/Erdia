import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

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
  const { nodes: initialNodes, edges: initialEdges } =
    convertSchemaToFlowData(schema);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        fitView
        className="bg-erd-bg-primary"
      >
        <Background color="var(--erd-bg-tertiary)" />
        <Controls className="[&_button]:!bg-erd-bg-secondary [&_button]:!border-erd-border-primary [&_button]:!text-erd-text-primary [&_button:hover]:!bg-erd-bg-tertiary" />
      </ReactFlow>
    </div>
  );
}
