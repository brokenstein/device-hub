import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Allowed file extensions
const ALLOWED_EXTENSIONS = ['.zip', '.brs', '.bsfw'];

// Sanitize filename to prevent injection attacks
const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
};

// Validate file before upload
const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
  }

  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { valid: false, error: `Invalid file type. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}` };
  }

  return { valid: true };
};

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file: File, bucket: string, path?: string) => {
    // Validate file before upload
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Sanitize the filename
      const sanitizedName = sanitizeFilename(file.name);
      const fileName = path 
        ? path.replace(file.name, sanitizedName) 
        : `${Date.now()}-${sanitizedName}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      setUploadProgress(100);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    uploadProgress,
  };
};
