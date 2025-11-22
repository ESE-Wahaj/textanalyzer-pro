import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SimplificationHeader from './components/SimplificationHeader';
import SimplificationControls from './components/SimplificationControls';
import TextComparisonView from './components/TextComparisonView';
import ReadabilityMetricsPanel from './components/ReadabilityMetricsPanel';
import ProcessingStatusBar from './components/ProcessingStatusBar';
import {
  SimplificationSettings,
  SimplificationModel,
  TextDocument,
  SentenceAnalysis,
  ProcessingStatus,
  ExportOptions,
} from './types';

const TextSimplificationTool = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'original' | 'simplified'>('split');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [document, setDocument] = useState<TextDocument>({
    id: 'doc-001',
    title: 'Marketing Strategy Document',
    originalText: `The implementation of comprehensive digital marketing strategies necessitates a multifaceted approach encompassing various channels and methodologies. Organizations must leverage sophisticated analytics platforms to optimize their customer acquisition costs while simultaneously enhancing brand visibility across multiple touchpoints. The utilization of advanced segmentation techniques enables marketers to deliver personalized messaging that resonates with specific demographic cohorts, thereby maximizing engagement rates and conversion probabilities.`,
    simplifiedText: '',
    sentences: [],
    originalReadability: {
      fleschScore: 28.5,
      gunningFog: 18.2,
      gradeLevel: 16,
      averageSentenceLength: 32.5,
      complexWordPercentage: 42.3,
    },
    simplifiedReadability: {
      fleschScore: 65.8,
      gunningFog: 9.4,
      gradeLevel: 8,
      averageSentenceLength: 15.2,
      complexWordPercentage: 18.5,
    },
    createdAt: new Date(),
    lastModified: new Date(),
  });

  const [sentences, setSentences] = useState<SentenceAnalysis[]>([
    {
      id: 'sent-001',
      originalText:
        'The implementation of comprehensive digital marketing strategies necessitates a multifaceted approach encompassing various channels and methodologies.',
      simplifiedText:
        'Creating effective digital marketing plans requires using multiple channels and methods together.',
      difficultyScore: 85,
      readabilityImprovement: 62,
      vocabularyChanges: [
        'implementation → creating',
        'comprehensive → effective',
        'necessitates → requires',
        'multifaceted → multiple',
      ],
      structureChanges: ['Split complex sentence', 'Simplified verb forms', 'Reduced clause nesting'],
      isSelected: false,
      isAccepted: false,
    },
    {
      id: 'sent-002',
      originalText:
        'Organizations must leverage sophisticated analytics platforms to optimize their customer acquisition costs while simultaneously enhancing brand visibility across multiple touchpoints.',
      simplifiedText:
        'Companies should use analytics tools to reduce customer costs and increase brand awareness at the same time.',
      difficultyScore: 78,
      readabilityImprovement: 58,
      vocabularyChanges: [
        'organizations → companies',
        'leverage → use',
        'sophisticated → (removed)',
        'optimize → reduce',
        'simultaneously → at the same time',
      ],
      structureChanges: ['Simplified compound sentence', 'Removed technical jargon', 'Clearer action verbs'],
      isSelected: false,
      isAccepted: false,
    },
    {
      id: 'sent-003',
      originalText:
        'The utilization of advanced segmentation techniques enables marketers to deliver personalized messaging that resonates with specific demographic cohorts, thereby maximizing engagement rates and conversion probabilities.',
      simplifiedText:
        'Using customer segmentation helps marketers send personalized messages to specific groups, which increases engagement and sales.',
      difficultyScore: 82,
      readabilityImprovement: 65,
      vocabularyChanges: [
        'utilization → using',
        'advanced → (removed)',
        'enables → helps',
        'resonates → (simplified)',
        'demographic cohorts → specific groups',
        'conversion probabilities → sales',
      ],
      structureChanges: ['Broke into simpler clauses', 'Removed passive voice', 'Direct cause-effect'],
      isSelected: false,
      isAccepted: false,
    },
  ]);

  const [settings, setSettings] = useState<SimplificationSettings>({
    intensity: 'moderate',
    targetGradeLevel: 8,
    audienceType: 'general',
    preserveTechnicalTerms: false,
    maintainTone: true,
  });

  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo');

  const models: SimplificationModel[] = [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Advanced model with superior context understanding',
      icon: 'Sparkles',
      recommended: true,
    },
    {
      id: 'claude-3',
      name: 'Claude 3 Opus',
      description: 'Excellent for maintaining nuance and tone',
      icon: 'Brain',
      recommended: false,
    },
    {
      id: 'custom-nlp',
      name: 'Custom NLP Model',
      description: 'Trained on domain-specific content',
      icon: 'Settings',
      recommended: false,
    },
  ];

  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    progress: 0,
    currentStep: '',
    error: null,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSimplify = () => {
    setProcessingStatus({
      isProcessing: true,
      progress: 0,
      currentStep: 'Analyzing text complexity...',
      error: null,
    });

    const steps = [
      { progress: 20, step: 'Analyzing text complexity...' },
      { progress: 40, step: 'Identifying difficult sentences...' },
      { progress: 60, step: 'Generating simplifications...' },
      { progress: 80, step: 'Calculating readability improvements...' },
      { progress: 100, step: 'Finalizing results...' },
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setProcessingStatus({
          isProcessing: true,
          progress: steps[currentStepIndex].progress,
          currentStep: steps[currentStepIndex].step,
          error: null,
        });
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setProcessingStatus({
          isProcessing: false,
          progress: 100,
          currentStep: '',
          error: null,
        });
        setHasUnsavedChanges(true);
      }
    }, 800);
  };

  const handleReset = () => {
    setSentences(
      sentences.map((s) => ({
        ...s,
        isSelected: false,
        isAccepted: false,
      }))
    );
    setHasUnsavedChanges(true);
  };

  const handleSentenceSelect = (sentenceId: string) => {
    setSentences(
      sentences.map((s) => ({
        ...s,
        isSelected: s.id === sentenceId ? !s.isSelected : s.isSelected,
      }))
    );
  };

  const handleSentenceAccept = (sentenceId: string) => {
    setSentences(
      sentences.map((s) => (s.id === sentenceId ? { ...s, isAccepted: true } : s))
    );
    setHasUnsavedChanges(true);
  };

  const handleSentenceReject = (sentenceId: string) => {
    setSentences(
      sentences.map((s) => (s.id === sentenceId ? { ...s, isAccepted: false } : s))
    );
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
  };

  const handleExport = (options: ExportOptions) => {
    console.log('Exporting with options:', options);
  };

  const handleTitleChange = (title: string) => {
    setDocument({ ...document, title });
    setHasUnsavedChanges(true);
  };

  return (
    <>
      <Helmet>
        <title>Text Simplification Tool - TextAnalyzer Pro</title>
        <meta
          name="description"
          content="Automatically improve content readability while preserving meaning through AI-powered text simplification"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

        <main className="lg:ml-60 pt-16">
          <div className="h-[calc(100vh-4rem)] flex flex-col">
            <SimplificationHeader
              documentTitle={document.title}
              onTitleChange={handleTitleChange}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              models={models}
              onExport={handleExport}
              onSave={handleSave}
              hasUnsavedChanges={hasUnsavedChanges}
            />

            <SimplificationControls
              settings={settings}
              onSettingsChange={setSettings}
              onSimplify={handleSimplify}
              onReset={handleReset}
              isProcessing={processingStatus.isProcessing}
            />

            <ProcessingStatusBar status={processingStatus} />

            <div className="flex-1 flex overflow-hidden">
              <TextComparisonView
                sentences={sentences}
                onSentenceSelect={handleSentenceSelect}
                onSentenceAccept={handleSentenceAccept}
                onSentenceReject={handleSentenceReject}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              <div className="hidden xl:block">
                <ReadabilityMetricsPanel
                  originalMetrics={document.originalReadability}
                  simplifiedMetrics={document.simplifiedReadability}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TextSimplificationTool;