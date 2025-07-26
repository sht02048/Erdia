import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

import { Column } from "@/entities/table";

export interface TableNodeData extends Record<string, unknown> {
  tableName: string;
  columns: Column[];
}

export interface TableNodeProps {
  data: TableNodeData;
}

function TableNode({ data }: TableNodeProps) {
  return (
    <div className="border-erd-table-border bg-erd-table-bg min-w-48 rounded-lg border shadow-xl">
      <div className="bg-erd-table-header-bg text-erd-text-primary rounded-t-lg px-4 py-2">
        <h3 className="font-semibold">{data.tableName}</h3>
      </div>

      <div className="p-0">
        {data.columns.map((column) => (
          <div
            key={`${data.tableName}-${column.name}`}
            className="border-erd-table-border flex items-center justify-between border-b px-4 py-2 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              {column.isPrimaryKey && (
                <span className="text-erd-icon-primary text-xs" title="Primary Key">🔑</span>
              )}
              {column.isForeignKey && (
                <span className="text-erd-icon-secondary text-xs" title="Foreign Key">🔗</span>
              )}
              <span className="text-erd-text-primary font-medium">
                {column.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-erd-text-secondary text-xs">
                {column.type}
              </span>
              {column.isNotNull && (
                <span className="text-erd-icon-danger text-xs" title="Not Null">*</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-erd-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-erd-handle"
      />
    </div>
  );
}

export default memo(TableNode);
