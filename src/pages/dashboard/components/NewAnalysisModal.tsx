import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

interface NewAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewAnalysisModal = ({ isOpen, onClose }: NewAnalysisModalProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'paste' | 'upload'>('paste');
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [documentType, setDocumentType] = useState('article');
  const [isProcessing, setIsProcessing] = useState(false);

  const documentTypes = [
    { value: 'article', label: 'Article' },
    { value: 'report', label: 'Report' },
    { value: 'email', label: 'Email' },
    { value: 'other', label: 'Other' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/plain' || file.type === 'application/pdf')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTextContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTextContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!textContent.trim()) return;
    
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onClose();
    navigate('/text-analysis-workspace', { 
      state: { 
        text: textContent, 
        documentType,
        fileName: fileName || 'Untitled Document'
      } 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">New Text Analysis</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-2">
            <Button
              variant={uploadMethod === 'paste' ? 'default' : 'outline'}
              size="sm"
              iconName="Type"
              iconSize={16}
              onClick={() => setUploadMethod('paste')}
              fullWidth
            >
              Paste Text
            </Button>
            <Button
              variant={uploadMethod === 'upload' ? 'default' : 'outline'}
              size="sm"
              iconName="Upload"
              iconSize={16}
              onClick={() => setUploadMethod('upload')}
              fullWidth
            >
              Upload File
            </Button>
          </div>

          {uploadMethod === 'paste' ? (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Paste Your Text
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste your text content here for analysis..."
                className="w-full h-64 px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {textContent.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload Document
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-150 ${
                  isDragging
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-foreground mb-2">
                  Drag and drop your file here, or
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: TXT, PDF (Max 10MB)
                </p>
                {fileName && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span>{fileName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Select
            label="Document Type"
            options={documentTypes}
            value={documentType}
            onChange={setDocumentType}
            placeholder="Select document type"
          />

          <Input
            label="Document Title (Optional)"
            type="text"
            placeholder="Enter a title for this analysis"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Play"
            iconSize={16}
            onClick={handleAnalyze}
            disabled={!textContent.trim() || isProcessing}
            loading={isProcessing}
          >
            Start Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewAnalysisModal;