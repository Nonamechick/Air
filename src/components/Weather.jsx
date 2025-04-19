import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';


const Weather = () => {
  const { t } = useContext(LanguageContext);

  const [weatherData, setWeatherData] = useState({
    temperature: 'Loading...',
    condition: 'Loading...',
    humidity: 'Loading...',
    windSpeed: 'Loading...',
    icon: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '💨',
      'Haze': '🌫️',
      'Dust': '💨',
      'Fog': '🌁',
      'Sand': '💨',
      'Ash': '💨',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return iconMap[condition] || '🌈';
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setWeatherData({
            temperature: `${Math.round(data.main.temp)}°C`,
            condition: data.weather[0].main,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`,
            icon: data.weather[0].icon
          });
          setError(null);
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to load weather data');
        setWeatherData({
          temperature: 'Error',
          condition: 'Error',
          humidity: 'Error',
          windSpeed: 'Error',
          icon: ''
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl p-6 m-4 flex-1 max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-2xl text-blue-900 tracking-tight">{t.weather}</h3>
        <div className="text-4xl">
          {weatherData.condition !== 'Loading...' && weatherData.condition !== 'Error' ? (
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
              alt={weatherData.condition}
              className="w-16 h-16"
            />
          ) : (
            <span>⏳</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
            <div className="flex items-center justify-center space-x-4">
              <div className="text-5xl font-bold text-blue-700">
                {weatherData.temperature}
              </div>
              <div className="text-left">
                <div className="text-xl font-medium text-gray-900 capitalize">{weatherData.condition.toLowerCase()}</div>
                <div className="text-sm text-gray-500">Tashkent, Uzbekistan</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">💧</span>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.humidity}</div>
                    <div className="mt-1 text-lg font-semibold text-blue-700">{weatherData.humidity}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">🌬️</span>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.wind}</div>
                    <div className="mt-1 text-lg font-semibold text-blue-700">{weatherData.windSpeed}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              Data provided by OpenWeatherMap
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;