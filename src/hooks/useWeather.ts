import { useState } from "react";
import type { WeatherState, DayOption, WeatherDay } from "../types/weather";

const API_KEY = import.meta.env.VITE_API_KEY;

function mapForecastToDays(list: any[]): Record<DayOption, WeatherDay> {
  const pick = (index: number): WeatherDay => ({
    date: list[index].dt_txt,
    tempC: Math.round(list[index].main.temp),
    tempF: Math.round(list[index].main.temp * 1.8 + 32),
    pressure: list[index].main.pressure,
    windSpeed: Math.round(list[index].wind.speed * 10) / 10,
    condition: list[index].weather[0].description,
  });

  return {
    today: pick(0),
    tomorrow: pick(8),
    after: pick(16),
  };
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    city: null,
    days: null,
    unit: null,
    error: undefined,
  });

  const setUnit = (unit: "C" | "F") => {
    setState((s) => ({ ...s, unit }));
  };

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const data = await res.json();

      if (!data.list || data.list.length < 17) throw new Error("Invalid API response");

      const days = mapForecastToDays(data.list);

      setState({
        city: data.city.name,
        days,
        unit: state.unit,
        error: undefined,
      });
    } catch {
      setState((s) => ({
        ...s,
        error: "Failed to fetch weather data",
      }));
    }
  };

  return { state, fetchWeather, setState, setUnit };
}
