import React, { useState } from 'react';
import { Users, Building2, Shield, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { UserRole } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const ROLES = [
  {
    id: 'citizen' as UserRole,
    title: 'Citizen',
    description: 'Report incidents, request help, access emergency services',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    features: ['Emergency SOS', 'Incident Reporting', 'Find Shelters', 'Request Help']
  },
  {
    id: 'ngo' as UserRole,
    title: 'NGO / Organization',
    description: 'Coordinate relief efforts, manage resources, deploy volunteers',
    icon: Building2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    features: ['Resource Management', 'Volunteer Coordination', 'Task Assignments', 'Relief Distribution']
  },
  {
    id: 'authority' as UserRole,
    title: 'Government Authority',
    description: 'Monitor situations, coordinate response, manage operations',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    features: ['Command Dashboard', 'Resource Allocation', 'Incident Verification', 'Response Coordination']
  }
];

export function RoleSelect() {
  const { selectedRole, setSelectedRole, setCurrentScreen } = useApp();
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      setCurrentScreen('login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Aapda Mitra
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to get started with disaster management and relief coordination
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {ROLES.map((role, index) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            const isHovered = hoveredRole === role.id;
            
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 transform ${
                  isSelected 
                    ? `ring-2 ring-red-500 ${role.borderColor} ${role.bgColor} scale-105` 
                    : isHovered
                    ? 'scale-102 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                padding="lg"
                onClick={() => setSelectedRole(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className={`mx-auto w-16 h-16 rounded-full ${role.bgColor} ${role.borderColor} border-2 flex items-center justify-center mb-4 transition-all duration-300 ${
                    isSelected || isHovered ? 'scale-110' : ''
                  }`}>
                    <Icon className={`w-8 h-8 ${role.color}`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {role.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {role.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center text-sm text-gray-500"
                        style={{ animationDelay: `${(index * 100) + (idx * 50)}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full ${role.color.replace('text-', 'bg-')} mr-2`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            size="lg"
            className="px-12"
          >
            Continue as {selectedRole ? ROLES.find(r => r.id === selectedRole)?.title : 'Selected Role'}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}