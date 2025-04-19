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
    mainPollutant: "Main Pollutant"
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
    mainPollutant: "Основной загрязнитель"
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
    mainPollutant: "Asosiy ifloslantiruvchi"
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