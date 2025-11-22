import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/ui/Sidebar';
import FilterPanel from './components/FilterPanel';
import ArchiveStatsPanel from './components/ArchiveStatsPanel';
import DocumentTable from './components/DocumentTable';
import MobileDocumentCard from './components/MobileDocumentCard';
import BulkActionsBar from './components/BulkActionsBar';
import ConfirmationModal from './components/ConfirmationModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { Document, FilterOptions, SortConfig, ArchiveStats } from './types';

const DocumentHistory = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'lastModified',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: { start: null, end: null },
    documentTypes: [],
    readabilityRange: { min: 0, max: 100 },
    collaborationStatus: [],
    searchQuery: ''
  });
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Understanding Machine Learning Fundamentals',
      analysisDate: new Date('2024-01-15'),
      readabilityScore: 78,
      collaborationStatus: 'completed',
      lastModified: new Date('2024-01-20'),
      documentType: 'article',
      wordCount: 2500,
      difficultyLevel: 'medium',
      collaborators: 3
    },
    {
      id: '2',
      title: 'Annual Financial Report 2023',
      analysisDate: new Date('2024-01-10'),
      readabilityScore: 45,
      collaborationStatus: 'active',
      lastModified: new Date('2024-01-22'),
      documentType: 'report',
      wordCount: 5200,
      difficultyLevel: 'hard',
      collaborators: 5
    },
    {
      id: '3',
      title: 'Introduction to React Hooks',
      analysisDate: new Date('2024-01-08'),
      readabilityScore: 82,
      collaborationStatus: 'solo',
      lastModified: new Date('2024-01-18'),
      documentType: 'blog',
      wordCount: 1800,
      difficultyLevel: 'easy'
    },
    {
      id: '4',
      title: 'Climate Change Impact Assessment',
      analysisDate: new Date('2024-01-05'),
      readabilityScore: 62,
      collaborationStatus: 'completed',
      lastModified: new Date('2024-01-15'),
      documentType: 'essay',
      wordCount: 3200,
      difficultyLevel: 'medium',
      collaborators: 2
    },
    {
      id: '5',
      title: 'API Documentation v2.0',
      analysisDate: new Date('2024-01-03'),
      readabilityScore: 55,
      collaborationStatus: 'active',
      lastModified: new Date('2024-01-23'),
      documentType: 'technical',
      wordCount: 4500,
      difficultyLevel: 'hard',
      collaborators: 4
    },
    {
      id: '6',
      title: 'Marketing Strategy Q1 2024',
      analysisDate: new Date('2024-01-01'),
      readabilityScore: 88,
      collaborationStatus: 'completed',
      lastModified: new Date('2024-01-12'),
      documentType: 'report',
      wordCount: 2100,
      difficultyLevel: 'easy',
      collaborators: 6
    },
    {
      id: '7',
      title: 'User Experience Best Practices',
      analysisDate: new Date('2023-12-28'),
      readabilityScore: 75,
      collaborationStatus: 'solo',
      lastModified: new Date('2024-01-10'),
      documentType: 'article',
      wordCount: 2800,
      difficultyLevel: 'medium'
    },
    {
      id: '8',
      title: 'Database Optimization Techniques',
      analysisDate: new Date('2023-12-25'),
      readabilityScore: 48,
      collaborationStatus: 'active',
      lastModified: new Date('2024-01-21'),
      documentType: 'technical',
      wordCount: 3900,
      difficultyLevel: 'hard',
      collaborators: 3
    }
  ];

  const archiveStats: ArchiveStats = {
    totalDocuments: 156,
    averageImprovement: 23,
    storageUsed: 850,
    storageLimit: 2048
  };

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = [...mockDocuments];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(query)
      );
    }

    if (filters.dateRange.start) {
      filtered = filtered.filter(doc => doc.analysisDate >= filters.dateRange.start!);
    }

    if (filters.dateRange.end) {
      filtered = filtered.filter(doc => doc.analysisDate <= filters.dateRange.end!);
    }

    if (filters.documentTypes.length > 0) {
      filtered = filtered.filter(doc =>
        filters.documentTypes.includes(doc.documentType)
      );
    }

    if (filters.collaborationStatus.length > 0) {
      filtered = filtered.filter(doc =>
        filters.collaborationStatus.includes(doc.collaborationStatus)
      );
    }

    filtered = filtered.filter(
      doc =>
        doc.readabilityScore >= filters.readabilityRange.min &&
        doc.readabilityScore <= filters.readabilityRange.max
    );

    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [mockDocuments, filters, sortConfig]);

  const handleView = (id: string) => {
    navigate('/dashboard');
  };

  const handleEdit = (id: string) => {
    navigate('/dashboard');
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate document:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share document:', id);
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Document',
      message: 'Are you sure you want to delete this document? This action cannot be undone.',
      onConfirm: () => {
        console.log('Delete document:', id);
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  const handleBulkExport = () => {
    console.log('Export documents:', selectedIds);
  };

  const handleBulkShare = () => {
    console.log('Share documents:', selectedIds);
  };

  const handleBulkDelete = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Multiple Documents',
      message: `Are you sure you want to delete ${selectedIds.length} document${
        selectedIds.length !== 1 ? 's' : ''
      }? This action cannot be undone.`,
      onConfirm: () => {
        console.log('Delete documents:', selectedIds);
        setSelectedIds([]);
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        {...({
          isCollapsed: isSidebarCollapsed,
          onToggleCollapse: () => setIsSidebarCollapsed(!isSidebarCollapsed)
        } as any)}
      />

      <main
        className={`transition-all duration-300 ease-smooth ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
        } pb-20 lg:pb-0`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-semibold text-3xl text-foreground mb-2">
                Document History
              </h1>
              <p className="text-muted-foreground">
                Manage and organize your complete text analysis archive
              </p>
            </div>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/dashboard')}
            >
              New Analysis
            </Button>
          </div>

          <ArchiveStatsPanel stats={archiveStats} />

          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredAndSortedDocuments.length}
          />

          <div className="hidden lg:block">
            <DocumentTable
              documents={filteredAndSortedDocuments}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onSort={setSortConfig}
              sortConfig={sortConfig}
              onView={handleView}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onShare={handleShare}
              onDelete={handleDelete}
            />
          </div>

          <div className="lg:hidden">
            {filteredAndSortedDocuments.map(doc => (
              <MobileDocumentCard
                key={doc.id}
                document={doc}
                isSelected={selectedIds.includes(doc.id)}
                onSelect={(checked) => {
                  if (checked) {
                    setSelectedIds([...selectedIds, doc.id]);
                  } else {
                    setSelectedIds(selectedIds.filter(id => id !== doc.id));
                  }
                }}
                onView={() => handleView(doc.id)}
                onEdit={() => handleEdit(doc.id)}
                onDuplicate={() => handleDuplicate(doc.id)}
                onShare={() => handleShare(doc.id)}
                onDelete={() => handleDelete(doc.id)}
              />
            ))}
            {filteredAndSortedDocuments.length === 0 && (
              <div className="py-16 text-center">
                <Icon
                  name="FileX"
                  size={48}
                  color="var(--color-muted-foreground)"
                  className="mx-auto mb-4"
                />
                <p className="text-lg font-medium text-foreground mb-2">
                  No documents found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or create a new document
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onExport={handleBulkExport}
        onShare={handleBulkShare}
        onDelete={handleBulkDelete}
        onClearSelection={() => setSelectedIds([])}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />
    </div>
  );
};

export default DocumentHistory;