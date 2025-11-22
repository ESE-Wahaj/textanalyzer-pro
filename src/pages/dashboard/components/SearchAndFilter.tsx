import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import type { FilterOptions } from '../types';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

const SearchAndFilter = ({ onSearch, onFilterChange, filters }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  const readabilityOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'low', label: 'Low (0-40)' },
    { value: 'medium', label: 'Medium (41-70)' },
    { value: 'high', label: 'High (71-100)' },
  ];

  const documentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Article' },
    { value: 'report', label: 'Report' },
    { value: 'email', label: 'Email' },
    { value: 'other', label: 'Other' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const activeFilterCount = Object.values(filters).filter((v) => v !== 'all').length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search analyses by title or content..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-150"
        >
          <Icon name="Filter" size={18} />
          <span className="text-sm font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value as string)}
            />
            <Select
              label="Readability Score"
              options={readabilityOptions}
              value={filters.readabilityScore}
              onChange={(value) => handleFilterChange('readabilityScore', value as string)}
            />
            <Select
              label="Document Type"
              options={documentTypeOptions}
              value={filters.documentType}
              onChange={(value) => handleFilterChange('documentType', value as string)}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                onFilterChange({
                  dateRange: 'all',
                  readabilityScore: 'all',
                  documentType: 'all',
                });
              }}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;