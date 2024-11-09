import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        toggleLanguage: "Switch to Persian",
        LayoutMetadata: {
          title: "Dekapost - task",
          description: "Dekapost - task for front-end developer",
        },
        MenuItems: {
          home: "Home",
          todoList: "To-Do List",
          weather: "Weather",
          setting: "Settings",
          title: "Dekapost Dashboard",
        },
        Weather: {
          title: "Current Weather", // Added title for the weather section
          temperature: "Temperature",
          windSpeed: "Wind Speed",
          windDirection: "Wind Direction",
        },
        Welcome: {
          morning: "Good morning",
          afternoon: "Good afternoon",
          evening: "Good evening",
        },
      },
    },
    fa: {
      translation: {
        welcome: "خوش آمدید",
        toggleLanguage: "تغییر به انگلیسی",
        LayoutMetadata: {
          title: "دکاپست - تسک",
          description: "دکاپست - تسک برای برنامه نویس فرانت اند",
        },
        MenuItems: {
          home: "خانه",
          todoList: "فهرست کارهای روزانه",
          weather: "آب و هوا",
          setting: "تنظیمات",
          title: "دکاپست",
        },
        Weather: {
          title: "آب و هوای کنونی", // Added title for the weather section in Persian
          temperature: "دما",
          windSpeed: "سرعت باد",
          windDirection: "جهت باد",
        },
        Welcome: {
          morning: "صبح بخیر",
          afternoon: "عصر بخیر",
          evening: "شب بخیر",
        },
      },
    },
  },
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
