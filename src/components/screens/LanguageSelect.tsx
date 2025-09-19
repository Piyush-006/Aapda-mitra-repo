import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { LANGUAGES } from '../../constants/languages';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function LanguageSelect() {
  const { language, setLanguage, setCurrentScreen } = useApp();
  const [selectedLang, setSelectedLang] = useState(language);

  const handleContinue = () => {
    setLanguage(selectedLang);
    setCurrentScreen('role-select');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Language
          </h1>
          <p className="text-lg text-gray-600">
            भाषा चुनें / Select Language
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 gap-3 mb-8 max-h-96 overflow-y-auto">
          {LANGUAGES.map((lang, index) => (
            <Card
              key={lang.code}
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                selectedLang === lang.code 
                  ? 'ring-2 ring-red-500 border-red-200 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              padding="sm"
              onClick={() => setSelectedLang(lang.code)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lang.nativeName}</h3>
                    <p className="text-sm text-gray-500">{lang.name}</p>
                  </div>
                </div>
                {selectedLang === lang.code && (
                  <div className="text-red-600">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          className="w-full"
          size="lg"
        >
          Continue
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <button
            onClick={() => setCurrentScreen('role-select')}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}