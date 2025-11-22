export interface TextDocument {
  id: string;
  content: string;
  fileName: string;
  fileType: string;
  uploadedAt: Date;
  language: string;
  wordCount: number;
  characterCount: number;
}

export interface ReadabilityMetrics {
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFogIndex: number;
  smogIndex: number;
  colemanLiauIndex: number;
  automatedReadabilityIndex: number;
  averageGradeLevel: number;
}

export interface SentenceAnalysis {
  id: string;
  text: string;
  difficultyScore: number;
  difficultyLevel: 'easy' | 'medium' | 'hard' | 'very-hard';
  startIndex: number;
  endIndex: number;
  explanation?: string;
  suggestions?: string[];
}

export interface SentimentAnalysis {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  confidence: number;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
}

export interface AnalysisDepth {
  value: 'quick' | 'standard' | 'comprehensive';
  label: string;
  description: string;
}

export interface ProcessingStatus {
  stage: 'idle' | 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';
  progress: number;
  message: string;
}

export interface ExportFormat {
  type: 'pdf' | 'docx' | 'txt' | 'json';
  label: string;
  icon: string;
}

export interface AnalysisResult {
  id: string;
  documentId: string;
  readabilityMetrics: ReadabilityMetrics;
  sentenceAnalyses: SentenceAnalysis[];
  sentimentAnalysis: SentimentAnalysis;
  keywords: string[];
  createdAt: Date;
  processingTime: number;
}

export interface CollaborationUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastActive: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  sentenceId?: string;
  timestamp: Date;
  replies?: Comment[];
}

export interface VersionHistory {
  id: string;
  documentId: string;
  version: number;
  content: string;
  changes: string;
  createdBy: string;
  createdAt: Date;
}