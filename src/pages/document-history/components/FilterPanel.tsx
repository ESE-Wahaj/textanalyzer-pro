import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  resultCount: number;
}

const FilterPanel = ({ filters, onFilterChange, resultCount }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const documentTypeOptions = [
    { value: 'article', label: 'Article' },
    { value: 'report', label: 'Report' },
    { value: 'essay', label: 'Essay' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'technical', label: 'Technical Document' }
  ];

  const collaborationStatusOptions = [
    { value: 'solo', label: 'Solo' },
    { value: 'active', label: 'Active Collaboration' },
    { value: 'completed', label: 'Completed Collaboration' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: e.target.value
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value ? new Date(value) : null
      }
    });
  };

  const handleDocumentTypeChange = (values: (string | number)[]) => {
    onFilterChange({
      ...filters,
      documentTypes: values as string[]
    });
  };

  const handleCollaborationStatusChange = (values: (string | number)[]) => {
    onFilterChange({
      ...filters,
      collaborationStatus: values as string[]
    });
  };

  const handleReadabilityRangeChange = (field: 'min' | 'max', value: string) => {
    onFilterChange({
      ...filters,
      readabilityRange: {
        ...filters.readabilityRange,
        [field]: value ? parseInt(value) : field === 'min' ? 0 : 100
      }
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      dateRange: { start: null, end: null },
      documentTypes: [],
      readabilityRange: { min: 0, max: 100 },
      collaborationStatus: [],
      searchQuery: ''
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={24} color="var(--color-primary)" />
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Filter Documents
          </h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {resultCount} results
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <Icon
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            size={20}
            color="var(--color-foreground)"
          />
        </button>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            type="search"
            label="Search Documents"
            placeholder="Search by title or content..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />

          <Input
            type="date"
            label="Start Date"
            value={filters.dateRange.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            className="w-full"
          />

          <Input
            type="date"
            label="End Date"
            value={filters.dateRange.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Document Type"
            placeholder="All types"
            options={documentTypeOptions}
            value={filters.documentTypes}
            onChange={handleDocumentTypeChange}
            multiple
            searchable
            clearable
          />

          <Select
            label="Collaboration Status"
            placeholder="All statuses"
            options={collaborationStatusOptions}
            value={filters.collaborationStatus}
            onChange={handleCollaborationStatusChange}
            multiple
            clearable
          />

          <Input
            type="number"
            label="Min Readability Score"
            placeholder="0"
            value={filters.readabilityRange.min.toString()}
            onChange={(e) => handleReadabilityRangeChange('min', e.target.value)}
            min="0"
            max="100"
            className="w-full"
          />

          <Input
            type="number"
            label="Max Readability Score"
            placeholder="100"
            value={filters.readabilityRange.max.toString()}
            onChange={(e) => handleReadabilityRangeChange('max', e.target.value)}
            min="0"
            max="100"
            className="w-full"
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;