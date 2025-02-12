import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FileText, LayoutDashboard } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import DocumentManagement from './pages/DocumentManagement';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900">DocuCompare</h1>
          </div>
          <nav className="px-4 py-2">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/documents"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <FileText className="h-5 w-5 mr-3" />
              Documents
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<DocumentManagement />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;