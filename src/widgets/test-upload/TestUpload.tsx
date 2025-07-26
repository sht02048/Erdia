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
    <div className="p-4 border border-red-500">
      <h3 className="text-red-500 font-bold mb-4">TEST UPLOAD COMPONENT</h3>
      
      {/* Method 1: Direct input */}
      <div className="mb-4">
        <label className="block mb-2">Method 1 - Direct Input:</label>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileChange}
          className="border p-2"
        />
      </div>

      {/* Method 2: Label wrapper */}
      <div className="mb-4">
        <label className="block mb-2">Method 2 - Label Wrapper:</label>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer inline-block">
          Choose File (Label)
          <input 
            type="file" 
            accept=".json" 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Method 3: Button + hidden input */}
      <div className="mb-4">
        <label className="block mb-2">Method 3 - Button + Hidden Input:</label>
        <button 
          onClick={() => {
            const input = document.getElementById('test-file-input') as HTMLInputElement;
            input?.click();
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Choose File (Button)
        </button>
        <input 
          id="test-file-input"
          type="file" 
          accept=".json" 
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}