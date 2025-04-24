
import React, { useRef } from "react";
import { Video, Plus } from "lucide-react";
import { Button } from "../ui/button";



const VideoUpload = ({
  videoFiles,
  handleRemoveVideo,
  handleVideoChange,
  videoDragRef,
  videoInputRef,
  handleDragOver,
  handleDrop
}) => {
  const handleVideoInputClick = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  return (
    <div>
      {videoFiles.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoFiles.map((video, index) => (
              <div key={index} className="relative border border-border rounded-md overflow-hidden">
                <video 
                  src={video.url} 
                  controls
                  className="w-full max-h-[300px]"
                />
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveVideo(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div 
              ref={videoDragRef}
              className="border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center p-4 h-40 relative cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleVideoInputClick}
            >
              <input
                id="videos"
                name="videos"
                type="file"
                accept="video/*"
                multiple
                className="sr-only"
                ref={videoInputRef}
                onChange={(e) => handleVideoChange(e.target.files)}
              />
              <Button 
                variant="ghost" 
                className="h-full w-full flex flex-col gap-2"
                type="button"
              >
                <Plus className="h-6 w-6" />
                <span className="text-sm">Add More Videos</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          ref={videoDragRef}
          className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleVideoInputClick}
        >
          <Video className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4 flex text-sm leading-6 text-gray-500 justify-center">
            <label
              htmlFor="videos"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
            >
              <span>Upload videos</span>
              <input
                id="videos"
                name="videos"
                type="file"
                accept="video/*"
                multiple
                className="sr-only"
                ref={videoInputRef}
                onChange={(e) => handleVideoChange(e.target.files)}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-500 mt-2">
            MP4, MOV, WebM up to 100MB
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
