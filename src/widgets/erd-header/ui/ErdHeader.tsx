const TITLE = "Erdia";
const DESCRIPTION = "Interactive Entity Relationship Diagram";

export default function ErdHeader() {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800">{TITLE}</h1>
      <p className="text-gray-600">{DESCRIPTION}</p>
    </div>
  );
}
