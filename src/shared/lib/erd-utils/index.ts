import { Edge, Node } from "@xyflow/react";

import { Relationship, Schema, Table } from "@/entities/table";
import { TableNodeData } from "@/shared/ui/TableNode";

export function convertTableToNode(table: Table): Node<TableNodeData> {
  return {
    id: table.id,
    type: "tableNode",
    position: table.position || { x: 0, y: 0 },
    data: {
      tableName: table.name,
      columns: table.columns,
    },
  };
}

export function convertRelationshipToEdge(relationship: Relationship): Edge {
  return {
    id: relationship.id,
    source: relationship.sourceTableId,
    target: relationship.targetTableId,
    sourceHandle: `${relationship.sourceColumn}-source`,
    targetHandle: `${relationship.targetColumn}-target`,
    type: "smoothstep",
    style: { stroke: "var(--erd-connection-line)", strokeWidth: 2 },
    label: `${relationship.sourceColumn} → ${relationship.targetColumn}`,
    labelStyle: { fontSize: 10, fill: "var(--erd-text-secondary)" },
  };
}

export function convertSchemaToFlowData(schema: Schema) {
  const nodes = schema.tables.map(convertTableToNode);
  const edges = schema.relationships.map(convertRelationshipToEdge);

  return { nodes, edges };
}
