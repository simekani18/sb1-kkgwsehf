import React from 'react';
import DocumentCard from './DocumentCard';

interface DocumentGridProps {
  documents: Array<{
    id: number;
    name: string;
    date: string;
    thumbnail: string;
    tags: string[];
  }>;
  sourceDoc: number | null;
  selectedDocument: number | null;
  onDocumentClick: (id: number) => void;
  onCompareClick: (id: number) => void;
}

const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  sourceDoc,
  selectedDocument,
  onDocumentClick,
  onCompareClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          doc={doc}
          sourceDoc={sourceDoc}
          selectedDocument={selectedDocument}
          onDocumentClick={onDocumentClick}
          onCompareClick={onCompareClick}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;
