import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Shield,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

export function Header({ title, showNotifications = true, onMenuClick }: HeaderProps) {
  const { user, isOnline, setUser } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">{title}</h1>
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <Wifi className="w-3 h-3 text-green-600" />
                ) : (
                  <WifiOff className="w-3 h-3 text-red-600" />
                )}
                <span className="text-xs text-gray-500">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          {showNotifications && (
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </div>
              )}
            </button>
          )}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.phone}</p>
                  <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <div className="flex items-center space-x-2 text-amber-800">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm">You're offline. Some features may not work.</span>
          </div>
        </div>
      )}
    </header>
  );
}