import { Schema } from "@/entities/table";

export interface SchemaMetadata {
  fileName?: string;
  uploadedAt?: Date;
  isValid: boolean;
  errorMessage?: string;
}

export interface SchemaState {
  schema: Schema | null;
  metadata: SchemaMetadata;
  isLoading: boolean;
}

export interface SchemaContextType {
  state: SchemaState;
  loadSchema: (schema: Schema, metadata?: Partial<SchemaMetadata>) => void;
  clearSchema: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}