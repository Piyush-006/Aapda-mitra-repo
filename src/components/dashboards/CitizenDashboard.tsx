import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Plus, 
  Shield, 
  Users, 
  Heart,
  Navigation,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Header } from '../layout/Header';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'nearby' | 'history'>('alerts');

  // Mock data
  const alerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected in your area. Stay indoors and avoid waterlogged areas.',
      time: '2 hours ago',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 2,
      type: 'safety',
      severity: 'medium',
      title: 'Road Closure Alert',
      message: 'Main highway closed due to construction. Use alternate routes.',
      time: '4 hours ago',
      location: 'Andheri East'
    }
  ];

  const nearbyServices = [
    { name: 'City Hospital', type: 'Medical', distance: '0.8 km', status: 'Open' },
    { name: 'Relief Camp Alpha', type: 'Shelter', distance: '1.2 km', status: 'Available' },
    { name: 'Food Distribution Center', type: 'Food', distance: '2.1 km', status: 'Open' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Citizen Dashboard" />
      
      <div className="p-4 space-y-6">
        {/* SOS Section */}
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">Emergency SOS</h2>
              <p className="text-red-100 text-sm">Press and hold for 3 seconds to activate</p>
            </div>
            <button className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95">
              <Phone className="w-8 h-8" />
            </button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card hover padding="sm" className="text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Report Incident</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Find Shelter</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Volunteer</p>
          </Card>
          
          <Card hover padding="sm" className="text-center">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Donate</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="space-y-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'alerts', label: 'Active Alerts', icon: AlertTriangle },
              { id: 'nearby', label: 'Nearby Services', icon: Navigation },
              { id: 'history', label: 'My Requests', icon: Clock }
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

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} padding="sm">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{alert.location}</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Nearby Services Tab */}
          {activeTab === 'nearby' && (
            <div className="space-y-4">
              {nearbyServices.map((service, index) => (
                <Card key={index} padding="sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.type}</p>
                      <p className="text-xs text-gray-500">{service.distance} away</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        service.status === 'Open' || service.status === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {service.status}
                      </span>
                      <div className="mt-2">
                        <Button size="sm" variant="outline">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <Card padding="sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Medical Emergency</h3>
                    <p className="text-sm text-gray-600">Ambulance dispatched and arrived</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </Card>
              
              <Card padding="sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Food Assistance</h3>
                    <p className="text-sm text-gray-600">Request submitted, awaiting response</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center active:scale-95">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}