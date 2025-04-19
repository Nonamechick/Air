import React, { useState, useEffect } from 'react';

const AirQuality = () => {
  const [airQualityData, setAirQualityData] = useState({
    aqi: 'Loading...',
    mainPollutant: 'Loading...',
  });

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await fetch(
          `https://api.airvisual.com/v2/nearest_city?key=${import.meta.env.VITE_AIR_QUALITY_API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setAirQualityData({
            aqi: data.data.current.pollution.aqius,
            mainPollutant: data.data.current.pollution.mainus,
          });
        } else {
          throw new Error('Failed to fetch air quality data');
        }
      } catch (error) {
        console.error(error);
        setAirQualityData({ aqi: 'Error', mainPollutant: 'Error' });
      }
    };

    fetchAirQuality();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-xl p-6 m-4 flex-1 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
      <h3 className="font-bold text-2xl text-green-800 mb-4 tracking-tight">AIR QUALITY INDEX</h3>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">AQI:</span> 
        <span className="ml-2 text-green-600">{airQualityData.aqi}</span>
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Main Pollutant:</span> 
        <span className="ml-2 text-green-600">{airQualityData.mainPollutant}</span>
      </p>
    </div>
  );
};

export default AirQuality;a