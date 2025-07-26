import { create } from "zustand";

import { Schema } from "@/entities/table";

interface SchemaState {
  schema: Schema | null;
  isLoading: boolean;
  error: string | null;
}

interface SchemaActions {
  setSchema: (schema: Schema) => void;
  clearSchema: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  hasSchema: () => boolean;
}

export const useSchemaStore = create<SchemaState & SchemaActions>()(
  (set, get) => ({
    schema: null,
    isLoading: false,
    error: null,

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
        isLoading: false,
      }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) =>
      set({
        error,
        isLoading: false,
      }),

    hasSchema: () => {
      const state = get();
      return state.schema !== null && state.schema.tables.length > 0;
    },
  })
);
