export interface ForecastItem {
  date: string;
  tempC: number;
  tempF: number;
  pressure: number;
  windSpeed: number;
  description: string;
}

export interface WeatherState {
  city: string | null;
  days: Record<DayOption, WeatherDay> | null;
  error?: string;
  unit: TempUnit;
}

export type DayOption = "today" | "tomorrow" | "after"; 

export type TempUnit = "C" | "F" | null;

export interface WeatherDay {
  date: string;
  tempC: number;
  tempF: number;
  pressure: number;
  windSpeed: number;
  condition: string;
}

export interface ButtDayProps {
  selected: DayOption | null;
  onSelect: (day: DayOption) => void;
}