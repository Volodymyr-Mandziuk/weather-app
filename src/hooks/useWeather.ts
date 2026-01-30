import { useState } from "react";
import type { ForecastItem, WeatherState } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    city: "",
    days: [],
    unit: "C",
  });

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (!data.list) throw new Error("Invalid API response");

      const dailyMap = new Map<string, any>();

      data.list.forEach((item: any) => {
        const day = item.dt_txt.split(" ")[0];
        if (!dailyMap.has(day)) dailyMap.set(day, item);
      });

      const days: ForecastItem[] = Array.from(dailyMap.values())
        .slice(0, 3)
        .map((item) => ({
          date: item.dt_txt,
          tempC: Math.round(item.main.temp),
          tempF: Math.round(item.main.temp * 1.8 + 32),
          pressure: item.main.pressure,
          windSpeed: Math.round(item.wind.speed * 10) / 10,
          description: item.weather[0].description,
        }));

      setState({
        city: data.city.name,
        days,
        unit: "C",
      });
    } catch {
      setState((s) => ({
        ...s,
        error: "Failed to fetch weather data",
      }));
    }
  };

  return { state, fetchWeather, setState };
}
