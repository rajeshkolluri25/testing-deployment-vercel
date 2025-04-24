
import React, { useRef } from "react";
import { Upload, Plus, MoreVertical } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";


const PhotoUpload = ({
  uploadedPhotos,
  handleSetAsCover,
  handleRemovePhoto,
  handlePhotoChange,
  photoDragRef,
  photoInputRef,
  handleDragOver,
  handleDrop
}) => {
  const handlePhotoInputClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  return (
    <div>
      {uploadedPhotos.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="relative group rounded-md overflow-hidden border border-border h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={photo.url} 
                  alt={`Property photo ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Cover Photo
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70">
                        <MoreVertical className="h-4 w-4 text-white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {index !== 0 && (
                        <DropdownMenuItem onClick={() => handleSetAsCover(index)}>
                          Set as cover
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleRemovePhoto(index)}>
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            <div 
              ref={photoDragRef}
              className="border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center p-4 h-40 relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handlePhotoInputClick}
            >
              <input
                id="photos"
                name="photos"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                ref={photoInputRef}
                onChange={(e) => handlePhotoChange(e.target.files)}
              />
              <Button 
                variant="ghost" 
                className="h-full w-full flex flex-col gap-2"
                type="button"
              >
                <Plus className="h-6 w-6" />
                <span className="text-sm">Add More Photos</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          ref={photoDragRef}
          className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handlePhotoInputClick}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4 flex text-sm leading-6 text-gray-500 justify-center">
            <label
              htmlFor="photos"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
            >
              <span>Upload files</span>
              <input
                id="photos"
                name="photos"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                ref={photoInputRef}
                onChange={(e) => handlePhotoChange(e.target.files)}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-500 mt-2">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
