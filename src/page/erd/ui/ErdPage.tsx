import { sampleSchema } from "@/shared/data/sample-schema";
import ErdFlow from "@/widgets/erd-flow";
import ErdHeader from "@/widgets/erd-header";

export default function ErdPage() {
  return (
    <div className="h-screen w-full">
      <ErdHeader />

      <div className="h-[calc(100vh-100px)]">
        <ErdFlow schema={sampleSchema} />
      </div>
    </div>
  );
}
