
import React, { useState, useRef, useCallback } from "react";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import ImageCropDialog from "./ImageCropDialog";
import { toast } from "sonner";
import PhotoUpload from "./PhotoUpload";
import VideoUpload from "./VideoUpload";
import DocumentUpload from "./DocumentUpload";


const PropertyUploadsSection = ({ 
  photos, 
  setPhotos, 
  documents, 
  setDocuments, 
  goToPrevTab 
}) => {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [currentImageToCrop, setCurrentImageToCrop] = useState(null);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const photoDragRef = useRef(null);
  const videoDragRef = useRef(null);

  const handlePhotoChange = (files) => {
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
          toast.error("Please upload valid image files");
          return;
        }
        
        const fileUrl = URL.createObjectURL(file);
        setCurrentImageToCrop(fileUrl);
        setCropDialogOpen(true);
      });
    }
  };

  const handleCropComplete = (croppedBlob) => {
    const file = new File([croppedBlob], `cropped-${Date.now()}.jpg`, { type: 'image/jpeg' });
    const fileUrl = URL.createObjectURL(file);
    
    setUploadedPhotos(prev => [...prev, { file, url: fileUrl }]);
    setPhotos(prev => [...prev, file]);
    toast.success("Image uploaded successfully");
    
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const handleVideoChange = (files) => {
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('video/')) {
          toast.error("Please upload valid video files");
          return;
        }
        
        if (file.size > 100 * 1024 * 1024) {
          toast.error("Video size should be less than 100MB");
          return;
        }
        
        const fileUrl = URL.createObjectURL(file);
        setVideoFiles(prev => [...prev, { file, url: fileUrl }]);
        toast.success("Video uploaded successfully");
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (type === 'photo') {
      handlePhotoChange(files);
    } else {
      handleVideoChange(files);
    }
  }, []);

  const handleRemovePhoto = (indexToRemove) => {
    setUploadedPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
    setPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
    toast.success("Photo removed");
  };

  const handleRemoveVideo = (indexToRemove) => {
    setVideoFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== indexToRemove);
      URL.revokeObjectURL(prev[indexToRemove].url);
      return newFiles;
    });
    toast.success("Video removed");
  };

  const handleSetAsCover = (indexToSetAsCover) => {
    if (indexToSetAsCover === 0) return;
    
    setUploadedPhotos(prev => {
      const newPhotos = [...prev];
      const temp = newPhotos[0];
      newPhotos[0] = newPhotos[indexToSetAsCover];
      newPhotos[indexToSetAsCover] = temp;
      return newPhotos;
    });
    
    setPhotos(prev => {
      const newPhotos = [...prev];
      const temp = newPhotos[0];
      newPhotos[0] = newPhotos[indexToSetAsCover];
      newPhotos[indexToSetAsCover] = temp;
      return newPhotos;
    });
    
    toast.success("Cover photo updated");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="mr-2 h-5 w-5" />
          Photos & Documents
        </CardTitle>
        <CardDescription>
          Upload property photos and relevant documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="photos" className="text-base font-medium mb-2 block">Property Photos</Label>
          <PhotoUpload 
            uploadedPhotos={uploadedPhotos}
            handleSetAsCover={handleSetAsCover}
            handleRemovePhoto={handleRemovePhoto}
            handlePhotoChange={handlePhotoChange}
            photoDragRef={photoDragRef}
            photoInputRef={photoInputRef}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, 'photo')}
          />
        </div>
        
        <div>
          <Label htmlFor="videos" className="text-base font-medium mb-2 block">Property Videos</Label>
          <VideoUpload 
            videoFiles={videoFiles}
            handleRemoveVideo={handleRemoveVideo}
            handleVideoChange={handleVideoChange}
            videoDragRef={videoDragRef}
            videoInputRef={videoInputRef}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, 'video')}
          />
        </div>
        
        <DocumentUpload 
          documents={documents}
          setDocuments={setDocuments}
        />
        
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={goToPrevTab}>Previous</Button>
          <Button type="submit">Submit Property</Button>
        </div>
      </CardContent>

      {currentImageToCrop && (
        <ImageCropDialog
          open={cropDialogOpen}
          onClose={() => {
            setCropDialogOpen(false);
            setCurrentImageToCrop(null);
          }}
          imageSrc={currentImageToCrop}
          onCropComplete={handleCropComplete}
        />
      )}
    </Card>
  );
};

export default PropertyUploadsSection;
