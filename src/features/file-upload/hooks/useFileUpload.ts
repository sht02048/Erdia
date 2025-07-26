"use client";

import { useCallback,useState } from "react";

import { SUPPORTED_FILE_TYPES,UploadedFile, UploadError, UploadState } from "../types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function useFileUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const validateFile = useCallback((file: File): UploadError | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        code: "FILE_TOO_LARGE",
      };
    }

    // Check file type
    const isSupported = Object.keys(SUPPORTED_FILE_TYPES).includes(file.type) ||
      Object.values(SUPPORTED_FILE_TYPES).some(ext => file.name.endsWith(ext));

    if (!isSupported) {
      return {
        message: `Unsupported file type. Supported formats: ${Object.values(SUPPORTED_FILE_TYPES).join(", ")}`,
        code: "UNSUPPORTED_FILE_TYPE",
      };
    }

    return null;
  }, []);

  const uploadFile = useCallback(async (
    file: File,
    onSuccess: (uploadedFile: UploadedFile) => void,
    onError?: (error: UploadError) => void
  ) => {
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState(prev => ({ ...prev, error: validationError }));
      onError?.(validationError);
      return;
    }

    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
    });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 100);

      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      clearInterval(progressInterval);

      const uploadedFile: UploadedFile = {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
      });

      onSuccess(uploadedFile);
    } catch (error) {
      const uploadError: UploadError = {
        message: error instanceof Error ? error.message : "Upload failed",
        code: "UPLOAD_FAILED",
      };

      setUploadState({
        isUploading: false,
        progress: 0,
        error: uploadError,
      });

      onError?.(uploadError);
    }
  }, [validateFile]);

  const resetUploadState = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
    });
  }, []);

  return {
    uploadState,
    uploadFile,
    validateFile,
    resetUploadState,
  };
}