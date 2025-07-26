export interface Column {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isNotNull?: boolean;
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
  position?: { x: number; y: number };
}

export interface Relationship {
  id: string;
  sourceTableId: string;
  targetTableId: string;
  sourceColumn: string;
  targetColumn: string;
  type: "one-to-one" | "one-to-many" | "many-to-many";
}

export interface Schema {
  tables: Table[];
  relationships: Relationship[];
}
