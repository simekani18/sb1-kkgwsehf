import React from 'react';
import { Search } from 'lucide-react';

interface DocumentFiltersProps {
  selectedFilter: string;
  searchQuery: string;
  onFilterChange: (filterId: string) => void;
  onSearchChange: (query: string) => void;
}

const filters = [
  { id: 'all', label: 'All Documents' },
  { id: 'recent', label: 'Recently Modified' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'quality', label: 'Quality Reports' }
];

const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  selectedFilter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search documents"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedFilter === filter.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentFilters;
