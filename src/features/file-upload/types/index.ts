export interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface UploadError {
  message: string;
  code: string;
}

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: UploadError | null;
}

export const SUPPORTED_FILE_TYPES = {
  "application/json": ".json",
  "text/plain": ".sql",
  "text/csv": ".csv",
} as const;

export type SupportedFileType = keyof typeof SUPPORTED_FILE_TYPES;