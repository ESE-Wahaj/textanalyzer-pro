export interface SimplificationSettings {
  intensity: 'light' | 'moderate' | 'aggressive';
  targetGradeLevel: number;
  audienceType: 'general' | 'academic' | 'business' | 'children';
  preserveTechnicalTerms: boolean;
  maintainTone: boolean;
}

export interface SentenceAnalysis {
  id: string;
  originalText: string;
  simplifiedText: string;
  difficultyScore: number;
  readabilityImprovement: number;
  vocabularyChanges: string[];
  structureChanges: string[];
  isSelected: boolean;
  isAccepted: boolean;
}

export interface TextDocument {
  id: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  sentences: SentenceAnalysis[];
  originalReadability: ReadabilityMetrics;
  simplifiedReadability: ReadabilityMetrics;
  createdAt: Date;
  lastModified: Date;
}

export interface ReadabilityMetrics {
  fleschScore: number;
  gunningFog: number;
  gradeLevel: number;
  averageSentenceLength: number;
  complexWordPercentage: number;
}

export interface SimplificationModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  recommended: boolean;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
  error: string | null;
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'txt' | 'html';
  includeComparison: boolean;
  includeMetrics: boolean;
  includeHighlighting: boolean;
}