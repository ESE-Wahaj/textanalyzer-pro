export interface AnalysisCard {
  id: string;
  title: string;
  readabilityScore: number;
  status: 'completed' | 'processing' | 'failed';
  lastModified: Date;
  documentType: string;
  wordCount: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
}

export interface UsageMetrics {
  monthlyAnalysisCount: number;
  readabilityImprovement: number;
  collaborationActivity: number;
  totalDocuments: number;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  type: 'template' | 'shared' | 'collaboration';
  icon: string;
  lastAccessed: Date;
}

export interface Notification {
  id: string;
  type: 'collaboration' | 'processing' | 'share';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface FilterOptions {
  dateRange: 'all' | 'today' | 'week' | 'month';
  readabilityScore: 'all' | 'low' | 'medium' | 'high';
  documentType: 'all' | 'article' | 'report' | 'email' | 'other';
}