import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import AnalysisCard from './components/AnalysisCard';
import UsageMetricsPanel from './components/UsageMetricsPanel';
import QuickAccessWidget from './components/QuickAccessWidget';
import NewAnalysisModal from './components/NewAnalysisModal';
import SearchAndFilter from './components/SearchAndFilter';
import type { AnalysisCard as AnalysisCardType, UsageMetrics, QuickAccessItem, FilterOptions } from './types';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    readabilityScore: 'all',
    documentType: 'all',
  });

  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisCardType[]>([
    {
      id: '1',
      title: 'Marketing Campaign Analysis Q4 2024',
      readabilityScore: 78,
      status: 'completed',
      lastModified: new Date(Date.now() - 3600000),
      documentType: 'Report',
      wordCount: 2450,
      difficultyLevel: 'medium',
    },
    {
      id: '2',
      title: 'Product Launch Email Draft',
      readabilityScore: 85,
      status: 'completed',
      lastModified: new Date(Date.now() - 7200000),
      documentType: 'Email',
      wordCount: 850,
      difficultyLevel: 'easy',
    },
    {
      id: '3',
      title: 'Technical Documentation Review',
      readabilityScore: 45,
      status: 'processing',
      lastModified: new Date(Date.now() - 1800000),
      documentType: 'Article',
      wordCount: 5200,
      difficultyLevel: 'hard',
    },
    {
      id: '4',
      title: 'Customer Support Guidelines',
      readabilityScore: 92,
      status: 'completed',
      lastModified: new Date(Date.now() - 86400000),
      documentType: 'Other',
      wordCount: 1650,
      difficultyLevel: 'easy',
    },
    {
      id: '5',
      title: 'Annual Financial Report Summary',
      readabilityScore: 62,
      status: 'completed',
      lastModified: new Date(Date.now() - 172800000),
      documentType: 'Report',
      wordCount: 3800,
      difficultyLevel: 'medium',
    },
    {
      id: '6',
      title: 'Blog Post: AI in Content Creation',
      readabilityScore: 88,
      status: 'completed',
      lastModified: new Date(Date.now() - 259200000),
      documentType: 'Article',
      wordCount: 1200,
      difficultyLevel: 'easy',
    },
  ]);

  const usageMetrics: UsageMetrics = {
    monthlyAnalysisCount: 47,
    readabilityImprovement: 23,
    collaborationActivity: 156,
    totalDocuments: 234,
  };

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: '1',
      title: 'Email Template - Product Launch',
      type: 'template',
      icon: 'FileText',
      lastAccessed: new Date(Date.now() - 7200000),
    },
    {
      id: '2',
      title: 'Shared: Marketing Strategy Doc',
      type: 'shared',
      icon: 'Share2',
      lastAccessed: new Date(Date.now() - 14400000),
    },
    {
      id: '3',
      title: 'Team Review: Q4 Report',
      type: 'collaboration',
      icon: 'Users',
      lastAccessed: new Date(Date.now() - 21600000),
    },
    {
      id: '4',
      title: 'Blog Post Template',
      type: 'template',
      icon: 'FileText',
      lastAccessed: new Date(Date.now() - 86400000),
    },
  ];

  const handleDeleteAnalysis = (id: string) => {
    setRecentAnalyses((prev) => prev.filter((analysis) => analysis.id !== id));
  };

  const handleDuplicateAnalysis = (id: string) => {
    const analysisToDuplicate = recentAnalyses.find((analysis) => analysis.id === id);
    if (analysisToDuplicate) {
      const newAnalysis = {
        ...analysisToDuplicate,
        id: `${Date.now()}`,
        title: `${analysisToDuplicate.title} (Copy)`,
        lastModified: new Date(),
      };
      setRecentAnalyses((prev) => [newAnalysis, ...prev]);
    }
  };

  const filteredAnalyses = recentAnalyses.filter((analysis) => {
    const matchesSearch =
      searchQuery === '' ||
      analysis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.documentType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDateRange = (() => {
      if (filters.dateRange === 'all') return true;
      const now = new Date();
      const diff = now.getTime() - analysis.lastModified.getTime();
      const hours = diff / 3600000;
      const days = diff / 86400000;

      switch (filters.dateRange) {
        case 'today':
          return hours < 24;
        case 'week':
          return days < 7;
        case 'month':
          return days < 30;
        default:
          return true;
      }
    })();

    const matchesReadability = (() => {
      if (filters.readabilityScore === 'all') return true;
      const score = analysis.readabilityScore;
      switch (filters.readabilityScore) {
        case 'low':
          return score <= 40;
        case 'medium':
          return score > 40 && score <= 70;
        case 'high':
          return score > 70;
        default:
          return true;
      }
    })();

    const matchesDocType =
      filters.documentType === 'all' ||
      analysis.documentType.toLowerCase() === filters.documentType.toLowerCase();

    return matchesSearch && matchesDateRange && matchesReadability && matchesDocType;
  });

  return (
    <>
      <Helmet>
        <title>Dashboard - TextAnalyzer Pro</title>
        <meta
          name="description"
          content="Access your text analysis workspace, monitor content optimization activities, and manage your documents with TextAnalyzer Pro dashboard."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

        <main className="lg:ml-60 pt-16">
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's an overview of your text analysis activities.
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconSize={20}
                onClick={() => setIsNewAnalysisOpen(true)}
              >
                New Analysis
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <UsageMetricsPanel metrics={usageMetrics} />

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Recent Analyses</h2>
                    <span className="text-sm text-muted-foreground">
                      {filteredAnalyses.length} of {recentAnalyses.length} documents
                    </span>
                  </div>

                  <SearchAndFilter
                    onSearch={setSearchQuery}
                    onFilterChange={setFilters}
                    filters={filters}
                  />

                  <div className="mt-6 space-y-4">
                    {filteredAnalyses.length > 0 ? (
                      filteredAnalyses.map((analysis) => (
                        <AnalysisCard
                          key={analysis.id}
                          analysis={analysis}
                          onDelete={handleDeleteAnalysis}
                          onDuplicate={handleDuplicateAnalysis}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-foreground font-medium mb-1">No analyses found</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Try adjusting your search or filters, or create a new analysis
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery('');
                            setFilters({
                              dateRange: 'all',
                              readabilityScore: 'all',
                              documentType: 'all',
                            });
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <QuickAccessWidget items={quickAccessItems} />

                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Getting Started</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Upload Your Text</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Paste or upload documents for analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Review Analysis</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Get readability scores and insights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Simplify Content</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Use AI to improve clarity and readability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <NewAnalysisModal isOpen={isNewAnalysisOpen} onClose={() => setIsNewAnalysisOpen(false)} />
      </div>
    </>
  );
};

export default Dashboard;