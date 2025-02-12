import React from 'react';
import { Upload, Grid, List } from 'lucide-react';

interface DocumentHeaderProps {
  viewMode: 'grid' | 'list';
  sourceDoc: number | null;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onResetComparison: () => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  viewMode,
  sourceDoc,
  onViewModeChange,
  onResetComparison,
}) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Document Management</h1>
        <div className="flex space-x-4">
          {sourceDoc && (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Select target document for comparison</span>
              <button
                onClick={onResetComparison}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </button>
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader;
