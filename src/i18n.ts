// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const language = localStorage.getItem("language") || "en"; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          toggleLanguage: "Switch to Persian",
          LayoutMetadata: {
            title: "Dekapost - task",
            description: "Dekapost - task for front-end developer"
          },
          LocaleSwitcher: {
            label: "Change language",
            locale: "{locale, select, fa { فارسی} en { English} other {Unknown}}"
          },
          MenuItems: {
            home: "home",
            todoList: "todoList",
            weather: "weather",
            setting: "setting",
            title: "dekapost dashboard"
          },
          Welcome: {
            morning: "Good morning",
            afternoon: "Good afternoon",
            evening: "Good evening"
          }
        }
      },
      fa: {
        translation: {
          welcome: "خوش آمدید",
          toggleLanguage: "تغییر به انگلیسی",
          LayoutMetadata: {
            title: "دکاپست - تسک",
            description: "دکاپست - تسک برای برنامه نویس فرانت اند"
          },
          LocaleSwitcher: {
            label: "سلام",
            locale: "{locale, select, fa { فارسی} en { English} other {Unknown}}"
          },
          MenuItems: {
            home: "خانه",
            todoList: "فهرست کارهای روزانه",
            weather: "آب و هوا",
            setting: "تنظیمات",
            title: "دکاپست"
          },
          Welcome: {
            morning: "صبح بخیر",
            afternoon: "عصر بخیر",
            evening: "شب بخیر"
          }
        }
      }
    },
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;