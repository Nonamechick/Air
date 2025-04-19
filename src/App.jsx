// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import { LanguageProvider, LanguageContext } from './context/LanguageContext';
import Weather from './components/Weather';
import AirQuality from './components/AirQuality';

const AppWrapper = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

const App = () => {
  const { t } = useContext(LanguageContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Refresh data every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1);
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-100">
            {t.dashboard}
          </h1>
          <LanguageSwitcher />
        </div>
        
        <div className="text-center text-sm text-gray-400 mb-6">
          {t.lastUpdated}: {formatTime(lastUpdated)} | {t.autoRefresh}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div key={`weather-${refreshKey}`}>
            <Weather />
          </div>
          <div key={`airquality-${refreshKey}`}>
            <AirQuality />
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>{t.clickRefresh}</p>
        </div>
      </div>
    </div>
  );
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        EN
      </button>
      <button 
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1 rounded-md ${language === 'ru' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        RU
      </button>
      <button 
        onClick={() => setLanguage('uz')}
        className={`px-3 py-1 rounded-md ${language === 'uz' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        UZ
      </button>
    </div>
  );
};

export default AppWrapper;