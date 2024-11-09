import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { selectLanguage } from "./redux/settingsSlice.ts";
import { store } from "./redux/store.ts";

const initialLanguage = selectLanguage(store.getState());

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
          title: "Current Weather",
          temperature: "Temperature",
          windSpeed: "Wind Speed",
          windDirection: "Wind Direction",
        },
        Welcome: {
          morning: "Good morning",
          afternoon: "Good afternoon",
          evening: "Good evening",
        },
        toast: {
          searchSuccess: "Search completed successfully",
          serverError: "Server error",
          badRequest: "Bad request: {{message}}",
          cityNotFound: "City not found. Please try another one.",
          fetchWeatherError:
            "Error fetching weather data. Please try again later.",
        },
        username: "Username",
        submit: "Change Username",
        usernameRequired: "Username is required",
        themeToggle: "ctrl + q to change background",
        addTodoPlaceholder: "add todo",
        addTodoButton: "add todo",
        editTodoPlaceholder: "edit todo",
        editTodoButton: "edit todo",
        todoApp: "Todo App",
        Guest: "Guest",
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
          title: "آب و هوای کنونی",
          temperature: "دما",
          windSpeed: "سرعت باد",
          windDirection: "جهت باد",
        },
        Welcome: {
          morning: "صبح بخیر",
          afternoon: "عصر بخیر",
          evening: "شب بخیر",
        },
        toast: {
          searchSuccess: "جستجو با موفقیت انجام شد",
          serverError: "خطای سرور",
          badRequest: "درخواست نادرست: {{message}}",
          cityNotFound: "شهر یافت نشد. لطفاً دوباره امتحان کنید.",
          fetchWeatherError:
            "خطا در دریافت داده‌های آب و هوا. لطفاً بعداً تلاش کنید.",
        },
        username: "نام کاربری ",
        submit: "تغییر نام کاربری ",
        usernameRequired: "نام کاربری اجباری هست",
        themeToggle: "ctrl + q برای تغییر پس‌زمینه",
        todoApp: "فهرست کارهای روزانه",
        addTodoPlaceholder: "اضافه کردن تسک",
        addTodoButton: "اضافه کردن تسک",
        editTodoPlaceholder: "ویرایش تسک",
        editTodoButton: "ویرایش تسک",
        Guest: "مهمان",
      },
    },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

store.subscribe(() => {
  const currentLanguage = selectLanguage(store.getState());
  if (currentLanguage !== i18n.language) {
    i18n.changeLanguage(currentLanguage);
  }
});

export default i18n;
