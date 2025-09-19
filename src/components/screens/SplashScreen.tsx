import React, { useEffect, useState } from 'react';
import { Shield, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function SplashScreen() {
  const { setCurrentScreen } = useApp();
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 300);
    const timer2 = setTimeout(() => setAnimationPhase(2), 800);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1300);
    const timer4 = setTimeout(() => setCurrentScreen('language-select'), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [setCurrentScreen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-orange-600 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="text-center z-10">
        {/* Logo Animation */}
        <div className={`mb-8 transition-all duration-1000 ${
          animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <div className="relative inline-block">
            <div className="bg-white rounded-full p-6 shadow-2xl">
              <Shield className="w-16 h-16 text-red-600" />
            </div>
            <div className={`absolute -top-2 -right-2 transition-all duration-500 delay-300 ${
              animationPhase >= 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <div className="bg-orange-500 rounded-full p-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className={`transition-all duration-800 delay-500 ${
          animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Aapda Mitra
          </h1>
          <p className="text-xl md:text-2xl text-red-100 font-medium">
            आपदा मित्र
          </p>
        </div>

        {/* Tagline */}
        <div className={`mt-6 transition-all duration-800 delay-700 ${
          animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-lg text-red-100 max-w-md mx-auto leading-relaxed">
            Your trusted companion in times of crisis
          </p>
        </div>

        {/* Loading Indicator */}
        <div className={`mt-12 transition-all duration-500 delay-1000 ${
          animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}