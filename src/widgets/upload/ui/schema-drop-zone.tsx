import { FileInput } from "@/features/schema-drop-zone";

export function SchemaDropZone() {
  return (
    <div className="bg-background flex h-full w-full items-center justify-center">
      <FileInput />
    </div>
  );
}
