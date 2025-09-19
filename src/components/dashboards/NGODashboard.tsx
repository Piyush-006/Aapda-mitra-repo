import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  MapPin, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Truck,
  Heart,
  Target
} from 'lucide-react';
import { Header } from '../layout/Header';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function NGODashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'resources'>('overview');

  // Mock data
  const stats = [
    { label: 'Active Volunteers', value: '127', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Resources Available', value: '1,450', change: '+8%', icon: Package, color: 'text-green-600' },
    { label: 'People Helped', value: '3,240', change: '+23%', icon: Heart, color: 'text-red-600' },
    { label: 'Active Missions', value: '18', change: '+5%', icon: Target, color: 'text-orange-600' },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Food Distribution - Sector 12',
      priority: 'high',
      status: 'in-progress',
      volunteers: 8,
      location: '2.1 km away',
      deadline: '2 hours'
    },
    {
      id: 2,
      title: 'Medical Camp Setup',
      priority: 'medium',
      status: 'pending',
      volunteers: 5,
      location: '3.5 km away',
      deadline: '4 hours'
    },
    {
      id: 3,
      title: 'Shelter Management',
      priority: 'low',
      status: 'completed',
      volunteers: 12,
      location: '1.8 km away',
      deadline: 'Completed'
    }
  ];

  const resources = [
    { name: 'Food Packets', available: 450, allocated: 200, unit: 'packets' },
    { name: 'Water Bottles', available: 800, allocated: 300, unit: 'bottles' },
    { name: 'Medical Kits', available: 75, allocated: 25, unit: 'kits' },
    { name: 'Blankets', available: 200, allocated: 150, unit: 'pieces' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="NGO Dashboard" />
      
      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} padding="sm">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card hover padding="sm" className="text-center">
            <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Deploy Resources</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Manage Volunteers</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Update Inventory</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium">View Reports</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="space-y-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'tasks', label: 'Active Tasks', icon: Target },
              { id: 'resources', label: 'Resources', icon: Package }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Food distribution completed in Sector 8</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">12 new volunteers registered</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-orange-100 rounded-full">
                      <Package className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Resource inventory updated</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} padding="sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{task.volunteers} volunteers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  
                  {task.status !== 'completed' && (
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="primary">
                        {task.status === 'pending' ? 'Start Task' : 'View Details'}
                      </Button>
                      <Button size="sm" variant="outline">
                        Assign Volunteers
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={index} padding="sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available</span>
                      <span className="font-medium">{resource.available} {resource.unit}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Allocated</span>
                      <span className="font-medium">{resource.allocated} {resource.unit}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${(resource.available / (resource.available + resource.allocated)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}