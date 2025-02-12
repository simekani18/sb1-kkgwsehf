import React, { useState } from 'react';
import {
  ArrowLeft,
  SplitSquareHorizontal,
  Layers,
  Eye,
  EyeOff,
  AlignCenter,
  Save,
  FileBarChart,
  Share2,
  BarChart2,
  FileText
} from 'lucide-react';

interface ComparisonViewProps {
  sourceDoc: number | null;
  targetDoc: number | null;
  resetComparison: () => void;
  documents: Array<{
    id: number;
    name: string;
    version: string;
    thumbnail: string;
  }>;
  mockDifferences: Array<{
    id: number;
    type: string;
    location: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    color?: string;
    border?: string;
  }>;
  mockComparisonStats: {
    totalChanges: number;
    additions: number;
    deletions: number;
    modifications: number;
  };
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  sourceDoc,
  targetDoc,
  resetComparison,
  documents,
  mockDifferences,
  mockComparisonStats
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'overlay'>('side-by-side');
  const [showDifferences, setShowDifferences] = useState(true);
  const [syncedNavigation, setSyncedNavigation] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(50);
  const [selectedDifference, setSelectedDifference] = useState<number | null>(null);
  const [showStats, setShowStats] = useState(true);

  const source = documents.find(doc => doc.id === sourceDoc);
  const target = documents.find(doc => doc.id === targetDoc);

  if (!source || !target) return null;

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={resetComparison}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setComparisonMode('side-by-side')}
                className={`p-2 rounded-lg ${comparisonMode === 'side-by-side' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                title="Side by Side View"
              >
                <SplitSquareHorizontal className="h-5 w-5" />
              </button>
              <button
                onClick={() => setComparisonMode('overlay')}
                className={`p-2 rounded-lg ${comparisonMode === 'overlay' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                title="Overlay View"
              >
                <Layers className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDifferences(!showDifferences)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${showDifferences ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              {showDifferences ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              <span className="text-sm font-medium">
                {showDifferences ? 'Hide Changes' : 'Show Changes'}
              </span>
            </button>
            <button
              onClick={() => setSyncedNavigation(!syncedNavigation)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${syncedNavigation ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <AlignCenter className="h-5 w-5" />
              <span className="text-sm font-medium">
                {syncedNavigation ? 'Unlink Pages' : 'Link Pages'}
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Save className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Save</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <FileBarChart className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Share2 className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 h-[calc(100vh-12rem)] overflow-auto">
        <div className={`flex ${comparisonMode === 'overlay' ? 'relative' : 'space-x-4'}`}>
          {/* Source Document */}
          <div className={`${comparisonMode === 'overlay' ? 'absolute inset-0' : 'flex-1'}`}>
            <div className="bg-white shadow-sm p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{source.name}</h3>
                  <p className="text-xs text-gray-500">Version {source.version}</p>
                </div>
                {comparisonMode === 'overlay' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={overlayOpacity}
                      onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
              <div
                className="relative"
                style={{
                  transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={source.thumbnail}
                  alt={source.name}
                  className="w-full object-cover"
                  style={{ opacity: comparisonMode === 'overlay' ? overlayOpacity / 100 : 1 }}
                />
                {showDifferences && (
                  <div className="absolute inset-0">
                    {mockDifferences.map(diff => (
                      <div
                        key={diff.id}
                        className="absolute border-2 rounded"
                        style={{
                          top: `${diff.location.y}%`,
                          left: `${diff.location.x}%`,
                          width: `${diff.location.width}px`,
                          height: `${diff.location.height}px`,
                          backgroundColor: diff.color,
                          borderColor: diff.border,
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedDifference(diff.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Target Document */}
          {comparisonMode === 'side-by-side' && (
            <div className="flex-1">
              <div className="bg-white shadow-sm p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900">{target.name}</h3>
                  <p className="text-xs text-gray-500">Version {target.version}</p>
                </div>
                <div
                  className="relative"
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={target.thumbnail}
                    alt={target.name}
                    className="w-full object-cover"
                  />
                  {showDifferences && (
                    <div className="absolute inset-0">
                      {mockDifferences.map(diff => (
                        <div
                          key={diff.id}
                          className="absolute border-2 rounded"
                          style={{
                            top: `${diff.location.y}%`,
                            left: `${diff.location.x}%`,
                            width: `${diff.location.width}px`,
                            height: `${diff.location.height}px`,
                            backgroundColor: diff.color,
                            borderColor: diff.border,
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedDifference(diff.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Statistics */}
        {showStats && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Comparison Statistics</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Total Changes</p>
                    <p className="text-lg font-semibold">{mockComparisonStats.totalChanges}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Added Content</p>
                    <p className="text-lg font-semibold">{mockComparisonStats.additions}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Removed Content</p>
                    <p className="text-lg font-semibold">{mockComparisonStats.deletions}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-yellow-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Modified Content</p>
                    <p className="text-lg font-semibold">{mockComparisonStats.modifications}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonView;
