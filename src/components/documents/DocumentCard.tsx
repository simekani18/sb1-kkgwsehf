import React from 'react';
import { Calendar, Download, Share2, GitCompare } from 'lucide-react';

interface DocumentCardProps {
  doc: {
    id: number;
    name: string;
    date: string;
    thumbnail: string;
    tags: string[];
  };
  sourceDoc: number | null;
  selectedDocument: number | null;
  onDocumentClick: (id: number) => void;
  onCompareClick: (id: number) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  sourceDoc,
  selectedDocument,
  onDocumentClick,
  onCompareClick,
}) => {
  return (
    <div
      key={doc.id}
      onClick={() => onDocumentClick(doc.id)}
      className={`group relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer ${
        selectedDocument === doc.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
    >
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCompareClick(doc.id);
          }}
          className={`inline-flex items-center px-3 py-1.5 rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
            sourceDoc === doc.id 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <GitCompare className={`h-4 w-4 ${sourceDoc === doc.id ? 'text-white' : 'text-gray-600'} mr-1.5`} />
          {sourceDoc === doc.id ? 'Selected' : 'Compare'}
        </button>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex space-x-2">
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
          >
            <Download className="h-4 w-4 text-gray-600" />
          </button>
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default DocumentCard;
