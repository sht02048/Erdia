import SchemaDropZone from "@/widgets/schema-dropzone";
import SchemaStatus from "@/widgets/schema-status";

export function SchemaZone() {
  return (
    <div className="w-full max-w-2xl space-y-6 px-4">
      <SchemaDropZone />
      <SchemaStatus />
    </div>
  );
}
