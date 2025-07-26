import { Handle, Position } from "@xyflow/react";

import { Column } from "@/entities/table";

export interface TableNodeData extends Record<string, unknown> {
  tableName: string;
  columns: Column[];
}

export interface TableNodeProps {
  data: TableNodeData;
}

export default function TableNode({ data }: TableNodeProps) {
  return (
    <div className="min-w-48 rounded-lg border border-gray-300 bg-white shadow-lg">
      <div className="rounded-t-lg bg-blue-600 px-4 py-2 text-white">
        <h3 className="font-semibold">{data.tableName}</h3>
      </div>

      <div className="p-0">
        {data.columns.map((column, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 px-4 py-2 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              {column.isPrimaryKey && (
                <span className="text-xs text-yellow-600">🔑</span>
              )}
              {column.isForeignKey && (
                <span className="text-xs text-green-600">🔗</span>
              )}
              <span className="font-medium text-gray-800">{column.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{column.type}</span>
              {column.isNotNull && (
                <span className="text-xs text-red-500">*</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Handle type="target" position={Position.Left} className="!bg-blue-500" />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500"
      />
    </div>
  );
}
