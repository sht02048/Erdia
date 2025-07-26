import SchemaDropZone from "@/widgets/schema-dropzone";

import { UploadTitle } from "./upload-title";

export function SchemaZone() {
  return (
    <div className="relative w-full max-w-2xl space-y-6 px-4">
      <UploadTitle />
      <SchemaDropZone />
    </div>
  );
}
