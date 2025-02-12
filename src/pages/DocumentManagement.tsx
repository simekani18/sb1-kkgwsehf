import React, { useState } from 'react';
import DocumentHeader from '../components/documents/DocumentHeader';
import DocumentFilters from '../components/documents/DocumentFilters';
import DocumentGrid from '../components/documents/DocumentGrid';
import DocumentList from '../components/documents/DocumentList';
import ComparisonView from '../components/documents/ComparisonView';

// Mock data for documents
const documents = [
  {
    id: 1,
    name: 'Product Specification v2.3',
    category: 'Specifications',
    date: '2024-03-15',
    size: '2.4 MB',
    version: '2.3',
    lastModified: '2024-03-15 14:30',
    author: 'John Doe',
    thumbnail: 'https://images.unsplash.com/photo-1568695269058-b6a7a7f1c9c7?auto=format&fit=crop&w=800&q=80',
    tags: ['Specification', 'Product', 'v2.3']
  },
  {
    id: 2,
    name: 'Product Specification v2.2',
    category: 'Specifications',
    date: '2024-03-10',
    size: '2.2 MB',
    version: '2.2',
    lastModified: '2024-03-10 11:20',
    author: 'John Doe',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    tags: ['Specification', 'Product', 'v2.2']
  },
  {
    id: 3,
    name: 'Manufacturing Process Guide',
    category: 'Manufacturing',
    date: '2024-03-14',
    size: '5.8 MB',
    version: '1.5',
    lastModified: '2024-03-14 09:45',
    author: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80',
    tags: ['Manufacturing', 'Process', 'Guide']
  },
  {
    id: 4,
    name: 'Q1 2024 Quality Report',
    category: 'Quality',
    date: '2024-03-13',
    size: '1.8 MB',
    version: '1.0',
    lastModified: '2024-03-13 16:20',
    author: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&w=800&q=80',
    tags: ['Quality', 'Report', 'Q1']
  },
  {
    id: 5,
    name: 'Product Line A Ingredients',
    category: 'Ingredients',
    date: '2024-03-12',
    size: '1.2 MB',
    version: '3.1',
    lastModified: '2024-03-12 13:15',
    author: 'Emma Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=800&q=80',
    tags: ['Ingredients', 'Product Line A']
  },
  {
    id: 6,
    name: 'Safety Guidelines 2024',
    category: 'Safety',
    date: '2024-03-11',
    size: '3.5 MB',
    version: '2.0',
    lastModified: '2024-03-11 10:30',
    author: 'Robert Taylor',
    thumbnail: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&w=800&q=80',
    tags: ['Safety', 'Guidelines', '2024']
  },
  {
    id: 7,
    name: 'Equipment Maintenance Schedule',
    category: 'Maintenance',
    date: '2024-03-09',
    size: '2.1 MB',
    version: '1.2',
    lastModified: '2024-03-09 14:45',
    author: 'David Brown',
    thumbnail: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    tags: ['Equipment', 'Maintenance', 'Schedule']
  },
  {
    id: 8,
    name: 'Supplier Agreement Template',
    category: 'Legal',
    date: '2024-03-08',
    size: '1.5 MB',
    version: '1.0',
    lastModified: '2024-03-08 11:20',
    author: 'Lisa Anderson',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    tags: ['Legal', 'Supplier', 'Agreement']
  },
  {
    id: 9,
    name: 'Environmental Impact Report',
    category: 'Environmental',
    date: '2024-03-07',
    size: '4.2 MB',
    version: '2.1',
    lastModified: '2024-03-07 15:30',
    author: 'James Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80',
    tags: ['Environmental', 'Report', 'Impact']
  },
  {
    id: 10,
    name: 'HR Training Manual',
    category: 'Training',
    date: '2024-03-06',
    size: '6.7 MB',
    version: '3.0',
    lastModified: '2024-03-06 09:15',
    author: 'Maria Garcia',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tags: ['Training', 'Manual', 'HR']
  }
];

// Mock data for document differences
const mockDifferences = [
  {
    id: 1,
    type: 'addition',
    location: { x: 20, y: 30, width: 100, height: 20 },
    color: 'rgba(0, 255, 0, 0.2)',
    border: '#00ff00'
  },
  {
    id: 2,
    type: 'deletion',
    location: { x: 40, y: 60, width: 80, height: 15 },
    color: 'rgba(255, 0, 0, 0.2)',
    border: '#ff0000'
  }
];

// Mock data for comparison statistics
const mockComparisonStats = {
  totalChanges: 15,
  additions: 6,
  deletions: 4,
  modifications: 5
};

function DocumentManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [sourceDoc, setSourceDoc] = useState<number | null>(null);
  const [targetDoc, setTargetDoc] = useState<number | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCompareClick = (docId: number) => {
    if (!sourceDoc) {
      setSourceDoc(docId);
    } else if (!targetDoc && docId !== sourceDoc) {
      setTargetDoc(docId);
      setShowConfirmation(true);
    }
  };

  const handleDocumentClick = (docId: number) => {
    setSelectedDocument(docId === selectedDocument ? null : docId);
  };

  const confirmComparison = () => {
    setIsComparing(true);
    setShowConfirmation(false);
  };

  const resetComparison = () => {
    setIsComparing(false);
    setSourceDoc(null);
    setTargetDoc(null);
    setSelectedDocument(null);
    setShowConfirmation(false);
  };

  if (isComparing) {
    return (
      <ComparisonView
        sourceDoc={sourceDoc}
        targetDoc={targetDoc}
        resetComparison={resetComparison}
        documents={documents}
        mockDifferences={mockDifferences}
        mockComparisonStats={mockComparisonStats}
      />
    );
  }

  return (
    <div className="p-8">
      <DocumentHeader
        viewMode={viewMode}
        sourceDoc={sourceDoc}
        onViewModeChange={setViewMode}
        onResetComparison={resetComparison}
      />

      <DocumentFilters
        selectedFilter={selectedFilter}
        searchQuery={searchQuery}
        onFilterChange={setSelectedFilter}
        onSearchChange={setSearchQuery}
      />

      <div className="p-6">
        {viewMode === 'grid' ? (
          <DocumentGrid
            documents={documents}
            sourceDoc={sourceDoc}
            selectedDocument={selectedDocument}
            onDocumentClick={handleDocumentClick}
            onCompareClick={handleCompareClick}
          />
        ) : (
          <DocumentList
            documents={documents}
            selectedDocument={selectedDocument}
            onDocumentClick={handleDocumentClick}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Comparison</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to compare these documents?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={resetComparison}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmComparison}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentManagement;