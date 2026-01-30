export interface ForecastItem {
  date: string;
  tempC: number;
  tempF: number;
  pressure: number;
  windSpeed: number;
  description: string;
}

export interface WeatherState {
  city: string;
  days: ForecastItem[];
  error?: string;
  unit: "C" | "F";
}