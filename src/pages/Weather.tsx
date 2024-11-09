import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Fade,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { cityData } from "../constant/cityData.ts";
import InputAutoComplete from "../components/InputAutoCompleteProps.tsx";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import axiosMethod from "../api";

import {
  clearIcon,
  cloudyIcon,
  rainIcon,
  snowIcon,
  windIcon,
  thunderstormIcon,
  drizzle,
} from "../assets";
import { toast } from "react-toastify";

interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  condition: string;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition?.toLowerCase()) {
    case "clear":
      return <img src={clearIcon} alt="Sunny" width={200} />;
    case "cloudy":
      return <img src={cloudyIcon} alt="Cloudy" width={200} />;
    case "rain":
      return <img src={rainIcon} alt="Rainy" width={200} />;
    case "snow":
      return <img src={snowIcon} alt="Snowy" width={200} />;
    case "wind":
      return <img src={windIcon} alt="Windy" width={200} />;
    case "thunderstorm":
      return <img src={thunderstormIcon} alt="Thunderstorm" width={200} />;
    default:
      return <img src={drizzle} alt="Drizzle" width={200} />;
  }
};

export default function Weather() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>();
  const theme = useTheme();

  const mapWeatherCodeToCondition = (code: number): string => {
    switch (code) {
      case 0:
        return "clear";
      case 1:
      case 2:
        return "cloudy";
      case 3:
        return "rain";
      case 4:
        return "snow";
      case 5:
        return "thunderstorm";
      default:
        return "drizzle";
    }
  };

  const searchWeather = async () => {
    if (!selectedCity) {
      toast.error(t("MenuItems.weather"));
      return;
    }

    const cityInfo = cityData.find(
      (item) =>
        (i18n.language === "fa" ? item.city_fa : item.city).toLowerCase() ===
        selectedCity.toLowerCase(),
    );

    if (!cityInfo) {
      toast.error(t("toast.cityNotFound"));
      return;
    }

    const { lat, lng } = cityInfo;

    setLoading(true);

    try {
      const response = await axiosMethod.get(
        `?latitude=${lat}&longitude=${lng}&current_weather=true`,
      );
      const data = response.data;

      setWeather({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        condition: mapWeatherCodeToCondition(data.current_weather.weathercode),
      });
    } catch (error) {
      console.error(error);
      toast.error(t("toast.fetchWeatherError"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedCity) {
      searchWeather();
    }
  }, [selectedCity]);

  const weatherDetails = [
    { label: t("Weather.temperature"), value: `${weather?.temperature} °C` },
    { label: t("Weather.windSpeed"), value: `${weather?.windspeed} km/h` },
    { label: t("Weather.windDirection"), value: `${weather?.winddirection}°` },
  ];

  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "60%",
        display: "flex",
        alignItems: selectedCity ? "center" : "flex-start",
        pt: "40px",
        px: "40px",
        justifyContent: selectedCity ? "space-between" : "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <InputAutoComplete
          options={cityData.map((item) =>
            i18n.language === "fa" ? item.city_fa : item.city,
          )}
          placeholder={t("MenuItems.weather")}
          onChange={setSelectedCity}
        />
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        weather &&
        selectedCity && (
          <Fade in>
            <Card
              sx={{
                mt: 2,
                width: "100%",
                maxWidth: 600,
                padding: 2,
                display: "flex",
                alignItems: "center",
                background: theme.palette.grey[100],
                height: "350px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <WeatherIcon condition={weather.condition} />
                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  }}
                >
                  {selectedCity}
                </Typography>
              </Box>
              <CardContent sx={{ flex: 1, ml: 2 }}>
                <Typography variant="h4" component="h4">
                  {t("Weather.title")}
                </Typography>
                {weatherDetails.map(({ label, value }) => (
                  <Typography variant="body2" sx={{ my: 2 }} key={label}>
                    {label}: {value}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Fade>
        )
      )}
    </Box>
  );
}
