import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Upload, 
  File, 
  CheckCircle2,
  Loader2,
  FolderOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Documents = () => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    setUploading(true);
    
    // Simulate upload to VM - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Successfully uploaded ${files.length} file(s)`, {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Mock recent uploads
  const recentUploads = [
    { name: 'report_2024.pdf', size: '2.4 MB', date: '2 hours ago', status: 'success' },
    { name: 'data_analysis.xlsx', size: '1.2 MB', date: '5 hours ago', status: 'success' },
    { name: 'presentation.pptx', size: '8.7 MB', date: '1 day ago', status: 'success' },
    { name: 'document.docx', size: '456 KB', date: '2 days ago', status: 'success' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Document Management</h1>
        <p className="text-muted-foreground">Upload and manage documents on your Linux VM</p>
      </div>

      {/* Upload Area */}
      <Card className="p-8 bg-card border-border animate-scale-in">
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center transition-all',
            dragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50',
            uploading && 'opacity-50 pointer-events-none'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <p className="text-lg font-medium text-foreground">Uploading to VM...</p>
            </div>
          ) : (
            <>
              <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-muted-foreground mb-6">
                Supports PDF, DOCX, XLSX, PPTX, and more
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />
              <label htmlFor="file-upload">
                <Button asChild className="bg-gradient-primary hover:opacity-90">
                  <span className="cursor-pointer">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Choose Files
                  </span>
                </Button>
              </label>
            </>
          )}
        </div>

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Upload Destination:</strong> Linux VM • Path: /var/documents/constitucheck/
          </p>
        </div>
      </Card>

      {/* Recent Uploads */}
      <Card className="p-6 bg-card border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <File className="h-5 w-5 text-primary" />
          Recent Uploads
        </h2>

        <div className="space-y-3">
          {recentUploads.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <File className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {file.size} • {file.date}
                  </p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Documents;
