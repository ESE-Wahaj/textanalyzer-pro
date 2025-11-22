import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TextEditor from './components/TextEditor';
import AnalysisControls from './components/AnalysisControls';
import ReadabilityMetricsCard from './components/ReadabilityMetricsCard';
import SentenceAnalysisPanel from './components/SentenceAnalysisPanel';
import SentimentAnalysisCard from './components/SentimentAnalysisCard';
import KeywordsCloud from './components/KeywordsCloud';
import ExportPanel from './components/ExportPanel';
import SentenceDetailModal from './components/SentenceDetailModal';
import type {
  TextDocument,
  ProcessingStatus,
  AnalysisDepth,
  AnalysisResult,
  SentenceAnalysis,
  ReadabilityMetrics,
  SentimentAnalysis,
} from './types';

const TextAnalysisWorkspace = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [document, setDocument] = useState<TextDocument | null>(null);
  const [analysisDepth, setAnalysisDepth] = useState<AnalysisDepth['value']>('standard');
  const [enableSentiment, setEnableSentiment] = useState(true);
  const [enableKeywords, setEnableKeywords] = useState(true);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    stage: 'idle',
    progress: 0,
    message: 'Ready to analyze',
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedSentence, setSelectedSentence] = useState<SentenceAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const mockDocument: TextDocument = {
      id: 'doc-1',
      content: `The implementation of advanced natural language processing algorithms has revolutionized the way we analyze textual content. These sophisticated systems employ machine learning techniques to extract meaningful insights from unstructured data. The complexity of linguistic patterns requires comprehensive computational approaches that can handle semantic nuances and contextual variations. Modern text analysis platforms integrate multiple analytical frameworks to provide holistic assessments of readability, sentiment, and structural characteristics. The interdisciplinary nature of this field combines computational linguistics, artificial intelligence, and cognitive science to create robust analytical tools. Organizations leverage these capabilities to optimize content for diverse audiences and improve communication effectiveness. The continuous evolution of NLP technologies promises even more sophisticated analytical capabilities in the future.`,
      fileName: 'Sample Analysis Document.txt',
      fileType: 'text/plain',
      uploadedAt: new Date(),
      language: 'en',
      wordCount: 115,
      characterCount: 892,
    };
    setDocument(mockDocument);
  }, []);

  const handleAnalyze = async () => {
    if (!document?.content) return;

    setProcessingStatus({ stage: 'processing', progress: 0, message: 'Initializing analysis...' });
    setShowResults(false);

    await new Promise(resolve => setTimeout(resolve, 500));
    setProcessingStatus({ stage: 'processing', progress: 25, message: 'Analyzing readability...' });

    await new Promise(resolve => setTimeout(resolve, 800));
    setProcessingStatus({ stage: 'analyzing', progress: 50, message: 'Processing sentences...' });

    await new Promise(resolve => setTimeout(resolve, 800));
    setProcessingStatus({ stage: 'analyzing', progress: 75, message: 'Extracting insights...' });

    await new Promise(resolve => setTimeout(resolve, 500));

    const mockMetrics: ReadabilityMetrics = {
      fleschReadingEase: 32.5,
      fleschKincaidGrade: 14.2,
      gunningFogIndex: 16.8,
      smogIndex: 15.3,
      colemanLiauIndex: 13.9,
      automatedReadabilityIndex: 14.7,
      averageGradeLevel: 14.9,
    };

    const mockSentences: SentenceAnalysis[] = [
      {
        id: 'sent-1',
        text: 'The implementation of advanced natural language processing algorithms has revolutionized the way we analyze textual content.',
        difficultyScore: 8.5,
        difficultyLevel: 'very-hard',
        startIndex: 0,
        endIndex: 122,
        explanation: 'This sentence contains complex technical terminology and a lengthy structure with multiple clauses, making it challenging for general audiences.',
        suggestions: [
          'Advanced NLP algorithms have changed how we analyze text.',
          'New language processing tools have improved text analysis.',
        ],
      },
      {
        id: 'sent-2',
        text: 'These sophisticated systems employ machine learning techniques to extract meaningful insights from unstructured data.',
        difficultyScore: 7.8,
        difficultyLevel: 'hard',
        startIndex: 123,
        endIndex: 236,
        explanation: 'Technical jargon and abstract concepts require specialized knowledge to fully comprehend.',
        suggestions: [
          'These systems use machine learning to find insights in data.',
          'The systems analyze data using machine learning.',
        ],
      },
      {
        id: 'sent-3',
        text: 'The complexity of linguistic patterns requires comprehensive computational approaches that can handle semantic nuances and contextual variations.',
        difficultyScore: 9.2,
        difficultyLevel: 'very-hard',
        startIndex: 237,
        endIndex: 379,
        explanation: 'Highly technical vocabulary combined with complex sentence structure creates significant comprehension barriers.',
        suggestions: [
          'Language patterns are complex and need advanced computer methods.',
          'Understanding language requires sophisticated computer analysis.',
        ],
      },
      {
        id: 'sent-4',
        text: 'Modern text analysis platforms integrate multiple analytical frameworks to provide holistic assessments of readability, sentiment, and structural characteristics.',
        difficultyScore: 7.5,
        difficultyLevel: 'hard',
        startIndex: 380,
        endIndex: 542,
        explanation: 'Multiple technical terms and a lengthy compound structure increase cognitive load.',
        suggestions: [
          'Modern platforms analyze text readability, sentiment, and structure.',
          'Text analysis tools check multiple aspects of writing.',
        ],
      },
      {
        id: 'sent-5',
        text: 'The interdisciplinary nature of this field combines computational linguistics, artificial intelligence, and cognitive science to create robust analytical tools.',
        difficultyScore: 8.8,
        difficultyLevel: 'very-hard',
        startIndex: 543,
        endIndex: 698,
        explanation: 'Academic terminology and complex conceptual relationships require advanced comprehension skills.',
        suggestions: [
          'This field combines language study, AI, and brain science.',
          'Multiple scientific areas work together to build analysis tools.',
        ],
      },
      {
        id: 'sent-6',
        text: 'Organizations leverage these capabilities to optimize content for diverse audiences and improve communication effectiveness.',
        difficultyScore: 6.2,
        difficultyLevel: 'medium',
        startIndex: 699,
        endIndex: 820,
        explanation: 'Business terminology with moderate complexity, accessible to professional audiences.',
        suggestions: [
          'Companies use these tools to improve their content for different readers.',
          'Organizations make their content better for various audiences.',
        ],
      },
      {
        id: 'sent-7',
        text: 'The continuous evolution of NLP technologies promises even more sophisticated analytical capabilities in the future.',
        difficultyScore: 6.8,
        difficultyLevel: 'medium',
        startIndex: 821,
        endIndex: 933,
        explanation: 'Technical acronym and forward-looking statement with moderate complexity.',
        suggestions: [
          'NLP technology keeps improving and will offer better analysis tools.',
          'Text analysis will become more advanced over time.',
        ],
      },
    ];

    const mockSentiment: SentimentAnalysis = {
      overall: 'positive',
      score: 0.72,
      confidence: 0.85,
      emotions: {
        joy: 0.15,
        sadness: 0.05,
        anger: 0.02,
        fear: 0.08,
        surprise: 0.25,
      },
    };

    const mockKeywords = [
      'natural language processing',
      'machine learning',
      'text analysis',
      'readability',
      'sentiment analysis',
      'computational linguistics',
      'artificial intelligence',
      'analytical frameworks',
      'content optimization',
      'NLP technologies',
      'semantic analysis',
      'cognitive science',
    ];

    const result: AnalysisResult = {
      id: `analysis-${Date.now()}`,
      documentId: document.id,
      readabilityMetrics: mockMetrics,
      sentenceAnalyses: mockSentences,
      sentimentAnalysis: mockSentiment,
      keywords: mockKeywords,
      createdAt: new Date(),
      processingTime: 2.5,
    };

    setAnalysisResult(result);
    setProcessingStatus({ stage: 'complete', progress: 100, message: 'Analysis complete!' });
    setShowResults(true);
  };

  const handleSentenceClick = (sentence: SentenceAnalysis) => {
    setSelectedSentence(sentence);
  };

  const handleSimplify = (sentence: SentenceAnalysis) => {
    navigate('/text-simplification-tool', { state: { sentence: sentence.text } });
  };

  const handleExport = (format: string, options: any) => {
    console.log('Exporting as:', format, 'with options:', options);
    alert(`Analysis exported as ${format.toUpperCase()} successfully!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

      <main className="lg:ml-60 pt-16">
        <div className="p-6 max-w-[1920px] mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-foreground">Text Analysis Workspace</h1>
              <Button
                variant="outline"
                size="sm"
                iconName="History"
                onClick={() => navigate('/dashboard')}
              >
                View History
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload or paste your text to analyze readability, sentiment, and complexity with advanced NLP tools
            </p>
          </div>

          {processingStatus.stage !== 'idle' && processingStatus.stage !== 'complete' && (
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="animate-spin">
                  <Icon name="Loader2" size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{processingStatus.message}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${processingStatus.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TextEditor
                document={document}
                onDocumentChange={setDocument}
                onAnalyze={handleAnalyze}
                processingStatus={processingStatus}
              />

              {showResults && analysisResult && (
                <>
                  <ReadabilityMetricsCard metrics={analysisResult.readabilityMetrics} />
                  <SentenceAnalysisPanel
                    sentences={analysisResult.sentenceAnalyses}
                    onSentenceClick={handleSentenceClick}
                  />
                </>
              )}
            </div>

            <div className="space-y-6">
              <AnalysisControls
                selectedDepth={analysisDepth}
                onDepthChange={setAnalysisDepth}
                enableSentiment={enableSentiment}
                onSentimentToggle={setEnableSentiment}
                enableKeywords={enableKeywords}
                onKeywordsToggle={setEnableKeywords}
              />

              {showResults && analysisResult && (
                <>
                  {enableSentiment && (
                    <SentimentAnalysisCard sentiment={analysisResult.sentimentAnalysis} />
                  )}
                  {enableKeywords && <KeywordsCloud keywords={analysisResult.keywords} />}
                  <ExportPanel onExport={handleExport} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <SentenceDetailModal
        sentence={selectedSentence}
        onClose={() => setSelectedSentence(null)}
        onSimplify={handleSimplify}
      />
    </div>
  );
};

export default TextAnalysisWorkspace;