import { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { TextDocument, ProcessingStatus } from '../types';

interface TextEditorProps {
  document: TextDocument | null;
  onDocumentChange: (document: TextDocument) => void;
  onAnalyze: () => void;
  processingStatus: ProcessingStatus;
}

const TextEditor = ({ document, onDocumentChange, onAnalyze, processingStatus }: TextEditorProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const characterCount = content.length;

    onDocumentChange({
      id: document?.id || `doc-${Date.now()}`,
      content,
      fileName: document?.fileName || 'Untitled Document',
      fileType: 'text',
      uploadedAt: document?.uploadedAt || new Date(),
      language: 'en',
      wordCount,
      characterCount,
    });
  };

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
      const characterCount = content.length;

      onDocumentChange({
        id: `doc-${Date.now()}`,
        content,
        fileName: file.name,
        fileType: file.type,
        uploadedAt: new Date(),
        language: 'en',
        wordCount,
        characterCount,
      });
    };
    reader.readAsText(file);
  }, [onDocumentChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/plain' || file.name.endsWith('.txt'))) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (textareaRef.current) {
        textareaRef.current.value = text;
        handleTextChange({ target: textareaRef.current } as React.ChangeEvent<HTMLTextAreaElement>);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    onDocumentChange({
      id: `doc-${Date.now()}`,
      content: '',
      fileName: 'Untitled Document',
      fileType: 'text',
      uploadedAt: new Date(),
      language: 'en',
      wordCount: 0,
      characterCount: 0,
    });
  };

  const isProcessing = processingStatus.stage !== 'idle' && processingStatus.stage !== 'complete';

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="FileText" size={20} className="text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">{document?.fileName || 'Untitled Document'}</h3>
            <p className="text-xs text-muted-foreground">
              {document?.wordCount || 0} words • {document?.characterCount || 0} characters
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Clipboard"
            onClick={handlePaste}
            disabled={isProcessing}
          >
            Paste
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Upload"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            Upload
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={handleClear}
            disabled={isProcessing}
          >
            Clear
          </Button>
        </div>
      </div>

      <div
        className={`flex-1 relative ${isDragging ? 'bg-primary/5' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <textarea
          ref={textareaRef}
          value={document?.content || ''}
          onChange={handleTextChange}
          placeholder="Start typing or drag and drop a text file here..."
          disabled={isProcessing}
          className="w-full h-full p-6 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none disabled:opacity-50"
        />
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary rounded-lg pointer-events-none">
            <div className="text-center">
              <Icon name="Upload" size={48} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-primary">Drop your file here</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          iconName="Play"
          onClick={onAnalyze}
          disabled={!document?.content || isProcessing}
          loading={isProcessing}
        >
          {isProcessing ? processingStatus.message : 'Analyze Text'}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,text/plain"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default TextEditor;