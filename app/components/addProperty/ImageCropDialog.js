
import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";



const ImageCropDialog = ({ open, onClose, imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState();
  const imageRef = useRef(null);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    
    // Create an aspect crop centered in the middle
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // 1:1 aspect ratio
        width,
        height
      ),
      width,
      height
    );
    
    setCrop(crop);
  };

  const createCroppedImage = async () => {
    if (!crop || !imageRef.current) return;

    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const pixelRatio = window.devicePixelRatio;
    
    // Calculate dimensions ensuring min height 500px, max 600px for 1:1 ratio
    let size = Math.max(500, Math.min(600, crop.width * scaleX * pixelRatio));
    
    canvas.width = size;
    canvas.height = size;
    
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';
    
    // Draw the cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      size / pixelRatio,
      size / pixelRatio
    );
    
    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, 'image/jpeg', 0.95);
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="py-4 overflow-hidden">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1}
            minHeight={100}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop me"
              onLoad={onImageLoad}
              className="max-h-[500px] object-contain"
            />
          </ReactCrop>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={createCroppedImage}>Crop & Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;
