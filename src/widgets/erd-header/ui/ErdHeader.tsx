const TITLE = "Erdia";
const DESCRIPTION = "Interactive Entity Relationship Diagram";

export default function ErdHeader() {
  return (
    <div className="bg-erd-bg-secondary border-erd-border-secondary border-b p-4">
      <h1 className="text-erd-text-primary text-2xl font-bold">{TITLE}</h1>
      <p className="text-erd-text-secondary">{DESCRIPTION}</p>
    </div>
  );
}
