import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

import { Column } from "@/entities/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/shadcn/tooltip";

export interface TableNodeData extends Record<string, unknown> {
  tableName: string;
  columns: Column[];
}

export interface TableNodeProps {
  data: TableNodeData;
}

function truncateType(
  type: string,
  maxLength: number = 10
): { truncated: string; needsTooltip: boolean } {
  if (type.length <= maxLength) {
    return { truncated: type, needsTooltip: false };
  }
  return { truncated: type.slice(0, maxLength) + "...", needsTooltip: true };
}

function TableNode({ data }: TableNodeProps) {
  return (
    <TooltipProvider>
      <div className="bg-card border-border min-w-48 cursor-default rounded-lg border shadow-xl">
        <div className="bg-muted text-card-foreground rounded-t-lg px-4 py-2">
          <h3 className="font-semibold">{data.tableName}</h3>
        </div>

        <div className="p-0">
          {data.columns.map((column) => (
            <div
              key={`${data.tableName}-${column.name}`}
              className="border-border flex items-center justify-between gap-8 border-b px-4 py-2 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                {column.isPrimaryKey && (
                  <span className="text-primary text-xs" title="Primary Key">
                    🔑
                  </span>
                )}
                {column.isForeignKey && (
                  <span
                    className="text-secondary-foreground text-xs"
                    title="Foreign Key"
                  >
                    🔗
                  </span>
                )}
                <span className="text-card-foreground font-medium">
                  {column.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(() => {
                  const { truncated, needsTooltip } = truncateType(column.type);
                  return needsTooltip ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-muted-foreground text-xs">
                          {truncated}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-base">{column.type}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      {truncated}
                    </span>
                  );
                })()}
                {column.isNotNull && (
                  <span className="text-destructive text-xs" title="Not Null">
                    *
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Handle
          type="target"
          position={Position.Left}
          id="left"
          className="!bg-primary"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className="!bg-primary"
        />
      </div>
    </TooltipProvider>
  );
}

export default memo(TableNode);
