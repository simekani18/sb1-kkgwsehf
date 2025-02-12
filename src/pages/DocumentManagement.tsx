import React, { useState } from 'react';
import { 
  FileText, Search, Upload, Grid, List, Filter, Download, Share2,
  Calendar, SortAsc, Trash2, GitCompare
} from 'lucide-react';

function DocumentManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [sourceDoc, setSourceDoc] = useState<number | null>(null);
  const [targetDoc, setTargetDoc] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const documents = [
    { 
      id: 1,
      name: 'Q4 Product Specs', 
      date: '2024-03-15', 
      type: 'PDF',
      size: '2.4 MB',
      category: 'Specifications',
      tags: ['product', 'q4'],
      thumbnail: 'https://images.unsplash.com/photo-1568695546513-9a472a8175a9?w=150&q=80'
    },
    { 
      id: 2,
      name: 'Ingredient List 2024', 
      date: '2024-03-14', 
      type: 'PDF',
      size: '1.8 MB',
      category: 'Ingredients',
      tags: ['ingredients', '2024'],
      thumbnail: 'https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=150&q=80'
    },
    { 
      id: 3,
      name: 'Manufacturing Guide', 
      date: '2024-03-13', 
      type: 'PDF',
      size: '5.2 MB',
      category: 'Manufacturing',
      tags: ['guide', 'manufacturing'],
      thumbnail: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=150&q=80'
    },
    { 
      id: 4,
      name: 'Quality Report', 
      date: '2024-03-12', 
      type: 'PDF',
      size: '3.1 MB',
      category: 'Quality',
      tags: ['report', 'quality'],
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&q=80'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Documents' },
    { id: 'recent', label: 'Recently Modified' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'quality', label: 'Quality Reports' }
  ];

  const handleCompare = () => {
    if (selectedDocument) {
      if (!sourceDoc) {
        setSourceDoc(selectedDocument);
        setSelectedDocument(null);
      } else if (!targetDoc && selectedDocument !== sourceDoc) {
        setTargetDoc(selectedDocument);
        setShowConfirmation(true);
      }
    }
  };

  const resetComparison = () => {
    setSourceDoc(null);
    setTargetDoc(null);
    setSelectedDocument(null);
    setShowConfirmation(false);
  };

  const handleDocumentClick = (docId: number) => {
    setSelectedDocument(docId === selectedDocument ? null : docId);
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Document Management</h1>
          <div className="flex space-x-4">
            {sourceDoc && !targetDoc && (
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Select target document for comparison</span>
                <button
                  onClick={resetComparison}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              onClick={handleCompare}
              disabled={!selectedDocument && !sourceDoc}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                sourceDoc ? 'text-white bg-green-600 hover:bg-green-700' : 'text-white bg-blue-600 hover:bg-blue-700'
              } ${(!selectedDocument && !sourceDoc) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              {sourceDoc ? 'Complete Comparison' : 'Compare Documents'}
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </button>
          </div>
        </div>
      </header>

      {/* Document Management Interface */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Search and Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-lg relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </button>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
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

        {/* Document Grid/List View */}
        <div className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc.id)}
                  className={`group relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer ${
                    selectedDocument === doc.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      src={doc.thumbnail}
                      alt={doc.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {doc.date}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {doc.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex space-x-2">
                      <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr
                      key={doc.id}
                      onClick={() => handleDocumentClick(doc.id)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedDocument === doc.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doc.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doc.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doc.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3">
                          <button className="text-gray-400 hover:text-gray-500">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Document Comparison</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to compare these documents?
              <br />
              <span className="font-medium">
                {documents.find(d => d.id === sourceDoc)?.name} vs {documents.find(d => d.id === targetDoc)?.name}
              </span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={resetComparison}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentManagement;