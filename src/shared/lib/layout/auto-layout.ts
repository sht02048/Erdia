import { Schema } from "@/entities/table";

export interface LayoutConfig {
  nodeWidth: number;
  nodeHeight: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  startX: number;
  startY: number;
}

const DEFAULT_CONFIG: LayoutConfig = {
  nodeWidth: 200,
  nodeHeight: 100,
  horizontalSpacing: 300,
  verticalSpacing: 150,
  startX: 100,
  startY: 100,
};

export class AutoLayout {
  private config: LayoutConfig;

  constructor(config?: Partial<LayoutConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Apply auto-layout to tables that don't have positions
   */
  applyLayout(schema: Schema): Schema {
    const tablesWithoutPosition = schema.tables.filter(
      (table) => !table.position
    );

    if (tablesWithoutPosition.length === 0) {
      return schema; // All tables already have positions
    }

    // Calculate positions for tables without positions
    const newPositions = this.calculateGridLayout(tablesWithoutPosition.length);

    const updatedTables = schema.tables.map((table) => {
      if (table.position) {
        return table; // Keep existing position
      }

      const index = tablesWithoutPosition.findIndex((t) => t.id === table.id);
      return {
        ...table,
        position: newPositions[index],
      };
    });

    return {
      ...schema,
      tables: updatedTables,
    };
  }

  /**
   * Calculate grid layout positions
   */
  private calculateGridLayout(count: number): Array<{ x: number; y: number }> {
    const positions: Array<{ x: number; y: number }> = [];

    // Calculate optimal grid dimensions
    const cols = Math.ceil(Math.sqrt(count));

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;

      const x =
        this.config.startX +
        col * (this.config.nodeWidth + this.config.horizontalSpacing);
      const y =
        this.config.startY +
        row * (this.config.nodeHeight + this.config.verticalSpacing);

      positions.push({ x, y });
    }

    return positions;
  }

  /**
   * Force-directed layout algorithm (simple version)
   */
  applyForceDirectedLayout(schema: Schema, iterations: number = 50): Schema {
    const tables = [...schema.tables];
    const relationships = schema.relationships;

    // Initialize positions if not set
    tables.forEach((table, index) => {
      if (!table.position) {
        const angle = (index / tables.length) * 2 * Math.PI;
        const radius = 200;
        table.position = {
          x: 400 + radius * Math.cos(angle),
          y: 300 + radius * Math.sin(angle),
        };
      }
    });

    // Apply force-directed algorithm
    for (let iter = 0; iter < iterations; iter++) {
      const forces = new Map<string, { x: number; y: number }>();

      // Initialize forces
      tables.forEach((table) => {
        forces.set(table.id, { x: 0, y: 0 });
      });

      // Repulsive forces between all nodes
      for (let i = 0; i < tables.length; i++) {
        for (let j = i + 1; j < tables.length; j++) {
          const table1 = tables[i];
          const table2 = tables[j];

          if (!table1.position || !table2.position) continue;

          const dx = table1.position.x - table2.position.x;
          const dy = table1.position.y - table2.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          const repulsiveForce = 5000 / (distance * distance);
          const fx = (dx / distance) * repulsiveForce;
          const fy = (dy / distance) * repulsiveForce;

          const force1 = forces.get(table1.id)!;
          const force2 = forces.get(table2.id)!;

          force1.x += fx;
          force1.y += fy;
          force2.x -= fx;
          force2.y -= fy;
        }
      }

      // Attractive forces for connected nodes
      relationships.forEach((rel) => {
        const sourceTable = tables.find((t) => t.id === rel.sourceTableId);
        const targetTable = tables.find((t) => t.id === rel.targetTableId);

        if (!sourceTable?.position || !targetTable?.position) return;

        const dx = targetTable.position.x - sourceTable.position.x;
        const dy = targetTable.position.y - sourceTable.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const attractiveForce = distance * 0.01;
        const fx = (dx / distance) * attractiveForce;
        const fy = (dy / distance) * attractiveForce;

        const sourceForce = forces.get(sourceTable.id)!;
        const targetForce = forces.get(targetTable.id)!;

        sourceForce.x += fx;
        sourceForce.y += fy;
        targetForce.x -= fx;
        targetForce.y -= fy;
      });

      // Apply forces to positions
      tables.forEach((table) => {
        if (!table.position) return;

        const force = forces.get(table.id)!;
        const damping = 0.1;

        table.position.x += force.x * damping;
        table.position.y += force.y * damping;

        // Keep nodes in bounds
        table.position.x = Math.max(50, Math.min(1500, table.position.x));
        table.position.y = Math.max(50, Math.min(1000, table.position.y));
      });
    }

    return {
      ...schema,
      tables,
    };
  }
}
