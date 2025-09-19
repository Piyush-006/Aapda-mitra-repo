import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { SplashScreen } from './components/screens/SplashScreen';
import { LanguageSelect } from './components/screens/LanguageSelect';
import { RoleSelect } from './components/screens/RoleSelect';
import { LoginScreen } from './components/screens/LoginScreen';
import { CitizenDashboard } from './components/dashboards/CitizenDashboard';
import { NGODashboard } from './components/dashboards/NGODashboard';
import { AuthorityDashboard } from './components/dashboards/AuthorityDashboard';

function AppContent() {
  const { currentScreen, user } = useApp();

  // Route to appropriate screen
  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'language-select') {
    return <LanguageSelect />;
  }

  if (currentScreen === 'role-select') {
    return <RoleSelect />;
  }

  if (currentScreen === 'login') {
    return <LoginScreen />;
  }

  if (currentScreen === 'dashboard' && user) {
    switch (user.role) {
      case 'citizen':
        return <CitizenDashboard />;
      case 'ngo':
        return <NGODashboard />;
      case 'authority':
        return <AuthorityDashboard />;
      default:
        return <SplashScreen />;
    }
  }

  return <SplashScreen />;
}

function App() {
  return (
    <AppProvider>
      <div className="font-sans antialiased">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;