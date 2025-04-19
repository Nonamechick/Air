import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

// Weather Icons mapping - Using Weather Icons font classes
const weatherIconMap = {
  '01d': 'wi-day-sunny',
  '01n': 'wi-night-clear',
  '02d': 'wi-day-cloudy',
  '02n': 'wi-night-cloudy',
  '03d': 'wi-cloud',
  '03n': 'wi-cloud',
  '04d': 'wi-cloudy',
  '04n': 'wi-cloudy',
  '09d': 'wi-rain',
  '09n': 'wi-rain',
  '10d': 'wi-day-rain',
  '10n': 'wi-night-rain',
  '11d': 'wi-thunderstorm',
  '11n': 'wi-thunderstorm',
  '13d': 'wi-snow',
  '13n': 'wi-snow',
  '50d': 'wi-fog',
  '50n': 'wi-fog'
};

const Weather = () => {
  const { t } = useContext(LanguageContext);
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 'Loading...',
      condition: 'Loading...',
      humidity: 'Loading...',
      windSpeed: 'Loading...',
      icon: ''
    },
    hourly: [],
    daily: []
  });


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      // Fetch both current weather and forecast
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tashkent&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
      ]);

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      if (!currentRes.ok || !forecastRes.ok) throw new Error('Failed to fetch weather data');

      // Process hourly data (next 24 hours)
      const hourly = forecastData.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).getHours() + ':00',
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        condition: item.weather[0].main
      }));

      // Process daily data (group by day)
      const daily = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short' });
        if (!daily[date]) {
          daily[date] = {
            minTemp: Math.round(item.main.temp_min),
            maxTemp: Math.round(item.main.temp_max),
            icon: item.weather[0].icon,
            condition: item.weather[0].main
          };
        } else {
          daily[date].minTemp = Math.min(daily[date].minTemp, Math.round(item.main.temp_min));
          daily[date].maxTemp = Math.max(daily[date].maxTemp, Math.round(item.main.temp_max));
        }
      });

      setWeatherData({
        current: {
          temperature: `${Math.round(currentData.main.temp)}°C`,
          condition: currentData.weather[0].main,
          humidity: `${currentData.main.humidity}%`,
          windSpeed: `${Math.round(currentData.wind.speed * 3.6)} km/h`,
          icon: currentData.weather[0].icon
        },
        hourly,
        daily: Object.entries(daily).map(([day, data]) => ({ day, ...data }))
      });

    } catch (error) {
      console.error(error);
      setError('Failed to load weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl p-6 m-4 flex-1 max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-2xl text-blue-900 tracking-tight">{t.weather}</h3>
        {weatherData.current.icon && (
          <div className="bg-white/80 p-3 rounded-full shadow-md">
            <i className={`wi ${weatherIconMap[weatherData.current.icon]} text-4xl text-blue-600`}></i>
          </div>
        )}
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
          <button 
            onClick={fetchWeather}
            className="mt-2 px-4 py-2 bg-blue-600 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
        {/* Current Weather */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-5xl font-bold text-blue-700">
              {weatherData.current.temperature}
            </div>
            <div className="text-left">
              <div className="text-xl font-medium text-gray-900 capitalize">
                {weatherData.current.condition.toLowerCase()}
              </div>
              <div className="text-sm text-gray-500">Tashkent, Uzbekistan</div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">{t.hour}</h4>
          <div className="flex overflow-x-auto pb-2 gap-3">
            {weatherData.hourly.map((hour, i) => (
              <div key={i} className="flex flex-col items-center bg-white/70 rounded-lg p-3 min-w-[70px]">
                <span className="text-sm font-medium">{hour.time}</span>
                <div className="my-1 bg-white p-2 rounded-full shadow-sm">
                  <i className={`wi ${weatherIconMap[hour.icon]} text-2xl text-blue-500`}></i>
                </div>
                <span className="font-bold text-blue-700">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Forecast */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">{t.day}</h4>
          <div className="space-y-3">
            {weatherData.daily.map((day, i) => (
              <div key={i} className="flex justify-between items-center bg-white/70 rounded-lg p-3">
                <span className="font-medium text-gray-800">{day.day}</span>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <i className={`wi ${weatherIconMap[day.icon]} text-xl text-blue-500`}></i>
                  </div>
                  <span className="font-semibold">
                    <span className="text-blue-700">{day.maxTemp}°</span> / 
                    <span className="text-blue-500">{day.minTemp}°</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Current Stats */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">💧</span>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.humidity}</div>
                  <div className="mt-1 text-lg font-semibold text-blue-700">{weatherData.current.humidity}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">🌬️</span>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.wind}</div>
                  <div className="mt-1 text-lg font-semibold text-blue-700">{weatherData.current.windSpeed}</div>
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