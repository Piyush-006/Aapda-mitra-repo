export type UserRole = 'citizen' | 'ngo' | 'authority';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
}

export interface Incident {
  id: string;
  reporterId: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'verified' | 'in-progress' | 'resolved';
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  media?: string[];
  createdAt: string;
  updatedAt: string;
}

export type IncidentType = 
  | 'fire' 
  | 'flood' 
  | 'earthquake' 
  | 'building-collapse' 
  | 'medical-emergency' 
  | 'accident' 
  | 'other';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger' | 'critical';
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  createdAt: string;
  expiresAt?: string;
}

export interface Resource {
  id: string;
  orgId: string;
  type: 'food' | 'water' | 'medicine' | 'shelter' | 'transport' | 'other';
  quantity: number;
  unit: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  available: number;
  updatedAt: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}