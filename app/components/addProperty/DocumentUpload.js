
import React from "react";
import { List, Check } from "lucide-react";
import { Label } from "../../components/ui/label";



const DocumentUpload = ({ documents, setDocuments }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setDocuments(e.dataTransfer.files);
    }
  };

  return (
    <div>
      <Label htmlFor="documents" className="text-base font-medium mb-2 block">Supporting Documents</Label>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('documents')?.click()}
      >
        <List className="mx-auto h-12 w-12 text-muted-foreground" />
        <div className="mt-4 flex text-sm leading-6 text-gray-500 justify-center">
          <label
            htmlFor="documents"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
          >
            <span>Upload files</span>
            <input
              id="documents"
              name="documents"
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => setDocuments(e.target.files)}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-500 mt-2">
          PDF, DOC up to 10MB
        </p>
      </div>
      {documents && documents.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium">Selected files:</p>
          <ul className="mt-1 text-sm text-muted-foreground">
            {Array.from(documents).map((file, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" /> {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
