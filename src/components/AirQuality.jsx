import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';


const AirQuality = () => {
  const { t } = useContext(LanguageContext);

  const [airQualityData, setAirQualityData] = useState({
    aqi: 'Loading...',
    mainPollutant: 'Loading...',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAqiColor = (aqi) => {
    if (aqi === 'Loading...' || aqi === 'Error') return 'bg-gray-200';
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-maroon-500';
  };

  const getAqiLevel = (aqi) => {
    if (aqi === 'Loading...' || aqi === 'Error') return t.aqiLevels.unknown;
    if (aqi <= 50) return t.aqiLevels.good;
    if (aqi <= 100) return t.aqiLevels.moderate;
    if (aqi <= 150) return t.aqiLevels.sensitive;
    if (aqi <= 200) return t.aqiLevels.unhealthy;
    if (aqi <= 300) return t.aqiLevels.veryUnhealthy;
    return t.aqiLevels.hazardous;
  };

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.airvisual.com/v2/nearest_city?key=${import.meta.env.VITE_AIR_QUALITY_API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setAirQualityData({
            aqi: data.data.current.pollution.aqius,
            mainPollutant: data.data.current.pollution.mainus,
          });
          setError(null);
        } else {
          throw new Error('Failed to fetch air quality data');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to load air quality data');
        setAirQualityData({ aqi: 'Error', mainPollutant: 'Error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAirQuality();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-300 to-indigo-300 rounded-2xl p-6 m-4 flex-1 max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-2xl text-indigo-900 tracking-tight">{t.airQuality}</h3>
        <div className={`w-12 h-12 rounded-full ${getAqiColor(airQualityData.aqi)} flex items-center justify-center text-white font-bold`}>
          {airQualityData.aqi}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-sm font-semibold text-indigo-600 mb-1">{t.aqi}</div>
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full ${getAqiColor(airQualityData.aqi)} flex items-center justify-center text-white font-bold text-2xl`}>
                {airQualityData.aqi}
              </div>
              <div>
                <div className="font-medium text-gray-900">{getAqiLevel(airQualityData.aqi)}</div>
                <div className="text-xs text-gray-500">{t.updated}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.mainPollutant}</div>
                <div className="mt-1 text-lg font-semibold text-indigo-700 capitalize">{airQualityData.mainPollutant.toLowerCase()}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</div>
                <div className="mt-1 text-lg font-semibold text-indigo-700">{getAqiLevel(airQualityData.aqi).split(' ')[0]}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              AQI scale: 0-50 Good | 51-100 Moderate | 101-150 Unhealthy for sensitive groups | 151-200 Unhealthy | 201-300 Very Unhealthy | 301+ Hazardous
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AirQuality;