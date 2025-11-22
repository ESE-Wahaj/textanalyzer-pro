export interface Document {
  id: string;
  title: string;
  analysisDate: Date;
  readabilityScore: number;
  collaborationStatus: 'solo' | 'active' | 'completed';
  lastModified: Date;
  documentType: 'article' | 'report' | 'essay' | 'blog' | 'technical';
  wordCount: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  collaborators?: number;
}

export interface FilterOptions {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  documentTypes: string[];
  readabilityRange: {
    min: number;
    max: number;
  };
  collaborationStatus: string[];
  searchQuery: string;
}

export interface SortConfig {
  key: keyof Document;
  direction: 'asc' | 'desc';
}

export interface ArchiveStats {
  totalDocuments: number;
  averageImprovement: number;
  storageUsed: number;
  storageLimit: number;
}

export interface BulkAction {
  type: 'export' | 'delete' | 'share';
  documentIds: string[];
}