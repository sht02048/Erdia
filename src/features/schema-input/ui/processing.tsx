interface Props {
  isProcessing: boolean;
}

export function Processing({ isProcessing }: Props) {
  return (
    <div className="space-y-4">
      <div className="text-4xl">📁</div>

      {isProcessing ? (
        <div className="text-muted-foreground">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            <span className="text-lg font-medium">Processing...</span>
          </div>
          <div className="text-sm">Reading your schema file</div>
        </div>
      ) : (
        <div className="text-foreground">
          <div className="mb-2 text-lg font-medium">
            Drop your schema file here
          </div>
          <div className="text-muted-foreground mb-4 text-sm">or</div>
          <div>📁 Browse Files</div>
          <div className="text-muted-foreground mt-4 text-xs">
            JSON format only • Max 5MB
          </div>
        </div>
      )}
    </div>
  );
}
