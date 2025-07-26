import { Column, Relationship, Schema, Table } from "@/entities/table";

export interface JsonSchemaInput {
  tables: Array<{
    id: string;
    name: string;
    columns: Array<{
      name: string;
      type: string;
      isPrimaryKey?: boolean;
      isForeignKey?: boolean;
      isNotNull?: boolean;
    }>;
    position?: { x: number; y: number };
  }>;
  relationships?: Array<{
    id: string;
    sourceTableId: string;
    targetTableId: string;
    sourceColumn: string;
    targetColumn: string;
    type: "one-to-one" | "one-to-many" | "many-to-many";
  }>;
}

export class JsonSchemaParser {
  parse(jsonString: string): Schema {
    let data: JsonSchemaInput;

    try {
      data = JSON.parse(jsonString);
    } catch {
      throw new Error("Invalid JSON format");
    }

    // Validate required structure
    if (!data.tables || !Array.isArray(data.tables)) {
      throw new Error("Schema must contain a 'tables' array");
    }

    // Parse tables
    const tables: Table[] = data.tables.map((tableData, _index) => {
      if (!tableData.name || !tableData.columns) {
        throw new Error(
          `Table at index ${_index} is missing required fields (name, columns)`
        );
      }

      if (!Array.isArray(tableData.columns)) {
        throw new Error(`Table '${tableData.name}' columns must be an array`);
      }

      const columns: Column[] = tableData.columns.map((colData, colIndex) => {
        if (!colData.name || !colData.type) {
          throw new Error(
            `Column at index ${colIndex} in table '${tableData.name}' is missing required fields (name, type)`
          );
        }

        return {
          name: colData.name,
          type: colData.type,
          isPrimaryKey: Boolean(colData.isPrimaryKey),
          isForeignKey: Boolean(colData.isForeignKey),
          isNotNull: Boolean(colData.isNotNull),
        };
      });

      return {
        id: tableData.id || tableData.name,
        name: tableData.name,
        columns,
        position: tableData.position,
      };
    });

    // Parse relationships (optional)
    let relationships: Relationship[] = [];
    if (data.relationships && Array.isArray(data.relationships)) {
      relationships = data.relationships.map((relData, _index) => {
        if (!relData.sourceTableId || !relData.targetTableId) {
          throw new Error(
            `Relationship at index ${_index} is missing required fields`
          );
        }

        return {
          id: relData.id || `${relData.sourceTableId}-${relData.targetTableId}`,
          sourceTableId: relData.sourceTableId,
          targetTableId: relData.targetTableId,
          sourceColumn: relData.sourceColumn || "id",
          targetColumn: relData.targetColumn || `${relData.sourceTableId}_id`,
          type: relData.type || "one-to-many",
        };
      });
    }

    return { tables, relationships };
  }

  validate(schema: Schema): string[] {
    const errors: string[] = [];

    // Validate tables
    if (schema.tables.length === 0) {
      errors.push("Schema must contain at least one table");
    }

    const tableIds = new Set<string>();
    schema.tables.forEach((table, _index) => {
      if (tableIds.has(table.id)) {
        errors.push(`Duplicate table ID: ${table.id}`);
      }
      tableIds.add(table.id);

      if (table.columns.length === 0) {
        errors.push(`Table '${table.name}' must have at least one column`);
      }

      // Check for duplicate column names within table
      const columnNames = new Set<string>();
      table.columns.forEach((column) => {
        if (columnNames.has(column.name)) {
          errors.push(
            `Duplicate column name '${column.name}' in table '${table.name}'`
          );
        }
        columnNames.add(column.name);
      });
    });

    // Validate relationships
    schema.relationships.forEach((relationship, index) => {
      const sourceTable = schema.tables.find(
        (t) => t.id === relationship.sourceTableId
      );
      const targetTable = schema.tables.find(
        (t) => t.id === relationship.targetTableId
      );

      if (!sourceTable) {
        errors.push(
          `Relationship ${index}: Source table '${relationship.sourceTableId}' not found`
        );
      }

      if (!targetTable) {
        errors.push(
          `Relationship ${index}: Target table '${relationship.targetTableId}' not found`
        );
      }

      if (
        sourceTable &&
        !sourceTable.columns.find((c) => c.name === relationship.sourceColumn)
      ) {
        errors.push(
          `Relationship ${index}: Source column '${relationship.sourceColumn}' not found in table '${sourceTable.name}'`
        );
      }

      if (
        targetTable &&
        !targetTable.columns.find((c) => c.name === relationship.targetColumn)
      ) {
        errors.push(
          `Relationship ${index}: Target column '${relationship.targetColumn}' not found in table '${targetTable.name}'`
        );
      }
    });

    return errors;
  }
}
