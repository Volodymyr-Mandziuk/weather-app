import type { WeatherDay, TempUnit, DayOption } from "../types/weather";

interface WeatherProps {
  city: string | null;
  days: Record<DayOption, WeatherDay> | null;
  unit: TempUnit;
  selectedDay: DayOption | null;
  error?: string;
  hasInput: boolean;
}

function Weather({
  city,
  days,
  unit,
  selectedDay,
  hasInput,
  error,
}: WeatherProps) {
  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!hasInput) {
    return <p>Enter a city to see the weather</p>;
  }

  if (!selectedDay) {
    return <p>Please, select a date</p>;
  } 

   if (!unit) {
    return <p>Please, select a temperature unit</p>;
  }

  if (!city || !days) {
    return null;
  }

  const day = days[selectedDay];

  const temperature = unit === "C" ? `${day.tempC} °C` : `${day.tempF} °F`;

  return (
    <div className="weather">
      <p>
        <strong>Date:</strong> {day.date}
      </p>
      <p>
        <strong>Temperature:</strong> {temperature}
      </p>
      <p>
        <strong>Pressure:</strong> {day.pressure} mBar
      </p>
      <p>
        <strong>Wind speed:</strong> {day.windSpeed} m/sec
      </p>
      <p>
        <strong>Condition:</strong> {day.condition}
      </p>
    </div>
  );
}

export default Weather;
