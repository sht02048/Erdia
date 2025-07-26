"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { Schema } from "@/entities/table";

import { SchemaContextType, SchemaMetadata, SchemaState } from "../types";

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

const initialState: SchemaState = {
  schema: null,
  metadata: {
    isValid: false,
  },
  isLoading: false,
};

interface SchemaProviderProps {
  children: ReactNode;
}

export function SchemaProvider({ children }: SchemaProviderProps) {
  const [state, setState] = useState<SchemaState>(initialState);

  const loadSchema = (
    schema: Schema,
    metadata: Partial<SchemaMetadata> = {}
  ) => {
    setState({
      schema,
      metadata: {
        isValid: true,
        uploadedAt: new Date(),
        ...metadata,
      },
      isLoading: false,
    });
  };

  const clearSchema = () => {
    setState(initialState);
  };

  const setLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string) => {
    setState((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, isValid: false, errorMessage: error },
      isLoading: false,
    }));
  };

  const value: SchemaContextType = {
    state,
    loadSchema,
    clearSchema,
    setLoading,
    setError,
  };

  return (
    <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>
  );
}

export function useSchema() {
  const context = useContext(SchemaContext);
  if (context === undefined) {
    throw new Error("useSchema must be used within a SchemaProvider");
  }
  return context;
}
