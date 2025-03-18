
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FileUploadFieldProps {
  id: string;
  label: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUploadField = ({ id, label, file, setFile }: FileUploadFieldProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Button 
          type="button"
          variant="outline"
          onClick={() => document.getElementById(id)?.click()}
          className="flex-1 text-gray-500 hover:text-gray-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          {file ? file.name : `Upload ${label}`}
        </Button>
        {file && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => setFile(null)}
            className="h-8 w-8"
          >
            ✕
          </Button>
        )}
      </div>
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadField;
