"use client";

export default function TestUpload() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      console.log(`File selected: ${file.name}`);
    }
  };

  return (
    <div className="border border-red-500 p-4">
      <h3 className="mb-4 font-bold text-red-500">TEST UPLOAD COMPONENT</h3>

      {/* Method 1: Direct input */}
      <div className="mb-4">
        <label className="mb-2 block">Method 1 - Direct Input:</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="border p-2"
        />
      </div>

      {/* Method 2: Label wrapper */}
      <div className="mb-4">
        <label className="mb-2 block">Method 2 - Label Wrapper:</label>
        <label className="inline-block cursor-pointer rounded bg-blue-500 px-4 py-2 text-white">
          Choose File (Label)
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Method 3: Button + hidden input */}
      <div className="mb-4">
        <label className="mb-2 block">Method 3 - Button + Hidden Input:</label>
        <button
          onClick={() => {
            const input = document.getElementById(
              "test-file-input"
            ) as HTMLInputElement;
            input?.click();
          }}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Choose File (Button)
        </button>
        <input
          id="test-file-input"
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
