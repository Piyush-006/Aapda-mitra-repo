import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Phone,
  Radio,
  Activity
} from 'lucide-react';
import { Header } from '../layout/Header';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'resources'>('overview');

  // Mock data
  const stats = [
    { label: 'Active Incidents', value: '23', change: '+5', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Response Teams', value: '45', change: '+3', icon: Users, color: 'text-blue-600' },
    { label: 'People Evacuated', value: '1,247', change: '+87', icon: Shield, color: 'text-green-600' },
    { label: 'Resources Deployed', value: '156', change: '+12', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const incidents = [
    {
      id: 1,
      type: 'Fire',
      severity: 'critical',
      location: 'Industrial Area, Sector 15',
      reportedAt: '15 mins ago',
      status: 'in-progress',
      teamsAssigned: 3,
      peopleAffected: 45
    },
    {
      id: 2,
      type: 'Flood',
      severity: 'high',
      location: 'Residential Complex, Block A',
      reportedAt: '1 hour ago',
      status: 'resolved',
      teamsAssigned: 2,
      peopleAffected: 120
    },
    {
      id: 3,
      type: 'Building Collapse',
      severity: 'critical',
      location: 'Construction Site, Phase 2',
      reportedAt: '2 hours ago',
      status: 'pending',
      teamsAssigned: 0,
      peopleAffected: 8
    }
  ];

  const resources = [
    { name: 'Fire Trucks', available: 12, deployed: 8, total: 20 },
    { name: 'Ambulances', available: 18, deployed: 7, total: 25 },
    { name: 'Rescue Teams', available: 8, deployed: 15, total: 23 },
    { name: 'Emergency Shelters', available: 5, deployed: 3, total: 8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Command Center" />
      
      <div className="p-4 space-y-6">
        {/* Critical Alert Banner */}
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">2 Critical Incidents Require Immediate Attention</h2>
                <p className="text-red-100 text-sm">Fire in Industrial Area & Building Collapse</p>
              </div>
            </div>
            <Button variant="outline" className="bg-white text-red-600 border-white hover:bg-red-50">
              View Details
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} padding="sm">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-xs text-green-600 font-medium">+{stat.change}</span>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card hover padding="sm" className="text-center">
            <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Live Map</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Radio className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Dispatch Teams</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Emergency Calls</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium">System Status</p>
          </Card>

          <Card hover padding="sm" className="text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Reports</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="space-y-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Situation Overview', icon: Activity },
              { id: 'incidents', label: 'Active Incidents', icon: AlertTriangle },
              { id: 'resources', label: 'Resource Status', icon: Shield }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-red-600 shadow-sm'
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
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Recent Operations</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flood evacuation completed - 120 people safe</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">3 Fire trucks dispatched to Industrial Area</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-red-100 rounded-full">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Building collapse reported - teams en route</p>
                      <p className="text-xs text-gray-500">30 minutes ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Communication Systems</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">GPS Tracking</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Alert System</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Warning</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Healthy</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <Card key={incident.id} padding="sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${
                          incident.severity === 'critical' ? 'bg-red-100' :
                          incident.severity === 'high' ? 'bg-orange-100' : 'bg-yellow-100'
                        }`}>
                          <AlertTriangle className={`w-4 h-4 ${
                            incident.severity === 'critical' ? 'text-red-600' :
                            incident.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{incident.type}</h3>
                          <p className="text-sm text-gray-600">{incident.location}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Reported</p>
                          <p className="font-medium">{incident.reportedAt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Teams Assigned</p>
                          <p className="font-medium">{incident.teamsAssigned}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">People Affected</p>
                          <p className="font-medium">{incident.peopleAffected}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            incident.status === 'resolved' ? 'bg-green-100 text-green-700' :
                            incident.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {incident.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="primary">
                      {incident.status === 'pending' ? 'Dispatch Teams' : 'View Details'}
                    </Button>
                    <Button size="sm" variant="outline">
                      Live Map
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Reporter
                    </Button>
                  </div>
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
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Available</p>
                      <p className="text-lg font-bold text-green-600">{resource.available}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Deployed</p>
                      <p className="text-lg font-bold text-blue-600">{resource.deployed}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Total</p>
                      <p className="text-lg font-bold text-gray-900">{resource.total}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${(resource.deployed / resource.total) * 100}%` 
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((resource.deployed / resource.total) * 100)}% utilization
                    </p>
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