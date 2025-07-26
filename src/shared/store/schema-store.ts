import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Schema } from "@/entities/table";

interface SchemaState {
  schema: Schema | null;
  isLoading: boolean;
  error: string | null;
  warnings: string[];
}

interface SchemaActions {
  setSchema: (schema: Schema) => void;
  clearSchema: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setWarnings: (warnings: string[]) => void;
  hasSchema: () => boolean;
}

export const useSchemaStore = create<SchemaState & SchemaActions>()(
  persist(
    (set, get) => ({
      schema: null,
      isLoading: false,
      error: null,
      warnings: [],

      setSchema: (schema) =>
        set({
          schema,
          error: null,
          isLoading: false,
        }),

      clearSchema: () =>
        set({
          schema: null,
          error: null,
          warnings: [],
          isLoading: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) =>
        set({
          error,
          isLoading: false,
        }),

      setWarnings: (warnings) => set({ warnings }),

      hasSchema: () => {
        const state = get();
        return state.schema !== null && state.schema.tables.length > 0;
      },
    }),
    {
      name: "erdia-schema-store",
      partialize: (state) => ({
        schema: state.schema,
        warnings: state.warnings,
      }),
    }
  )
);
