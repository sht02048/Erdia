import { Schema } from "@/entities/table";

import { AutoLayout } from "../layout/auto-layout";
import { JsonSchemaParser } from "./json-parser";

export { AutoLayout } from "../layout/auto-layout";
export { JsonSchemaParser } from "./json-parser";

export interface ParseResult {
  schema: Schema;
  errors: string[];
  warnings: string[];
}

export class SchemaParserFactory {
  private jsonParser = new JsonSchemaParser();
  private autoLayout = new AutoLayout();

  async parseFile(file: File): Promise<ParseResult> {
    const content = await this.readFileContent(file);
    
    try {
      let schema: Schema;
      const errors: string[] = [];
      const warnings: string[] = [];

      // Determine parser based on file extension or content
      if (file.name.endsWith('.json') || file.type === 'application/json') {
        schema = this.jsonParser.parse(content);
        const validationErrors = this.jsonParser.validate(schema);
        errors.push(...validationErrors);
      } else {
        throw new Error(`Unsupported file format: ${file.name}`);
      }

      // Apply auto-layout if tables don't have positions
      const hasPositions = schema.tables.some(table => table.position);
      if (!hasPositions) {
        schema = this.autoLayout.applyLayout(schema);
        warnings.push("Auto-layout applied - table positions were generated automatically");
      }

      return { schema, errors, warnings };
    } catch (error) {
      return {
        schema: { tables: [], relationships: [] },
        errors: [error instanceof Error ? error.message : "Unknown parsing error"],
        warnings: [],
      };
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          resolve(content);
        } else {
          reject(new Error('Failed to read file content'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }
}