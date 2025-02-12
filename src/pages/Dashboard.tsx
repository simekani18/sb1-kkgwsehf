import React from 'react';
import { BarChart2, Database, GitCompare as Compare, Upload, Bell } from 'lucide-react';

function Dashboard() {
  const quickStats = [
    { label: "Today's Documents", value: '24', icon: BarChart2, trend: '+12%' },
    { label: 'Comparisons Made', value: '156', icon: Compare, trend: '+5%' },
    { label: 'Storage Used', value: '45.2GB', icon: Database, trend: '80%' }
  ];

  const activities = [
    { type: 'upload', text: 'Product Spec v2.3 uploaded', time: '2 mins ago', icon: Upload },
    { type: 'comparison', text: 'Comparison: V2.2 vs V2.3', time: '15 mins ago', icon: Compare },
    { type: 'notification', text: 'Storage usage alert', time: '1 hour ago', icon: Bell }
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <activity.icon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;