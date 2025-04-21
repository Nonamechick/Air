// src/context/LanguageContext.js
import React, { createContext, useState } from 'react';

const translations = {
  en: {
    dashboard: "Environment Dashboard",
    lastUpdated: "Last updated",
    autoRefresh: "Auto-refreshes every minute",
    clickRefresh: "Data updates automatically. Click on a card to refresh manually",
    weather: "Weather",
    airQuality: "Air Quality",
    temperature: "Temperature",
    condition: "Condition",
    humidity: "Humidity",
    wind: "Wind",
    aqi: "AQI",
    mainPollutant: "Main Pollutant",
    hour: "Hourly Forecast",
    day: "7-Day Forecast",
    aqiLevels: {
      unknown: "Unknown",
      good: "Good",
      moderate: "Moderate",
      sensitive: "Unhealthy for Sensitive Groups",
      unhealthy: "Unhealthy",
      veryUnhealthy: "Very Unhealthy",
      hazardous: "Hazardous"
    },
    status: "STATUS",
    updated: "Updated just now",
  },
  ru: {
    dashboard: "Экологическая панель",
    lastUpdated: "Обновлено",
    autoRefresh: "Автообновление каждую минуту",
    clickRefresh: "Данные обновляются автоматически. Нажмите на карточку для ручного обновления",
    weather: "Погода",
    airQuality: "Качество воздуха",
    temperature: "Температура",
    condition: "Состояние",
    humidity: "Влажность",
    wind: "Ветер",
    aqi: "ИКВ",
    mainPollutant: "Основной загрязнитель",
    hour: "Почасовой прогноз",
    day: "7-дневный прогноз",
    aqiLevels: {
      unknown: "Неизвестно",
      good: "Хорошо",
      moderate: "Умеренно",
      sensitive: "Вредно для чувствительных групп",
      unhealthy: "Вредно",
      veryUnhealthy: "Очень вредно",
      hazardous: "Опасно"
    },
    status: "Статус",
    updated: "Обновлено только что",
  },
  uz: {
    dashboard: "Atrof-muhit paneli",
    lastUpdated: "Yangilandi",
    autoRefresh: "Har minutda avtoyangilash",
    clickRefresh: "Ma'lumotlar avtomatik yangilanadi. Qo'lda yangilash uchun kartochkani bosing",
    weather: "Ob-havo",
    airQuality: "Havo sifati",
    temperature: "Harorat",
    condition: "Holat",
    humidity: "Namlik",
    wind: "Shamol",
    aqi: "HIS",
    mainPollutant: "Asosiy ifloslantiruvchi",
    hour: "Soatlik prognoz",
    day: "7 kunlik prognoz",
    aqiLevels: {
      unknown: "Noma'lum",
      good: "Yaxshi",
      moderate: `O‘rtacha`,
      sensitive: "Nozik guruhlar uchun zararli",
      unhealthy: "Zararli",
      veryUnhealthy: "Juda zararli",
      hazardous: "Havfli"
    },
    status: "STATUS",
    updated: "Hozir yangilangan",
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};