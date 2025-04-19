import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 'Loading...',
    condition: 'Loading...',
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Example: Fetch weather data for Tashkent using OpenWeatherMap API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setWeatherData({
            temperature: `${Math.round(data.main.temp)}°C`,
            condition: data.weather[0].main,
          });
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error(error);
        setWeatherData({ temperature: 'Error', condition: 'Error' });
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 rounded-xl p-6 m-4 flex-1 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
      <h3 className="font-bold text-2xl text-blue-800 mb-4 tracking-tight">WEATHER</h3>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Temperature:</span> 
        <span className="ml-2 text-blue-600">{weatherData.temperature}</span>
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Condition:</span> 
        <span className="ml-2 text-blue-600">{weatherData.condition}</span>
      </p>
    </div>
  );
};

export default Weather;