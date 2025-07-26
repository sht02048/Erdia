export function UploadTitle() {
  return (
    <div className="absolute top-1/2 left-1/2 -mt-48 w-150 -translate-x-1/2 -translate-y-1/2 transform text-center">
      <h1 className="text-foreground mb-4 text-4xl font-bold">
        Welcome to Erdia
      </h1>
      <p className="text-muted-foreground text-lg">
        Upload your JSON schema file to generate an Entity Relationship Diagram
      </p>
    </div>
  );
}
