import ErdFlow from "@/widgets/erd-flow";
import ErdHeader from "@/widgets/erd-header";
import SchemaStatus from "@/widgets/schema-status";

export default function ErdPage() {
  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <ErdHeader />
      <SchemaStatus />

      <div className="flex-1">
        <ErdFlow />
      </div>
    </div>
  );
}
