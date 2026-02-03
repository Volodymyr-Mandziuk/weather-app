import { useState, useEffect } from "react";
import Info from "./components/Info";
import FormInfo from "./components/FormInfo";
import Weather from "./components/Weather";
import ButtDay from "./components/ButtDay";
import ButtDeg from "./components/ButtDeg";
import { useWeather } from "./hooks/useWeather";
import type { FormEvent } from "react";
import type { DayOption } from "./types/weather";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [cityInput, setCityInput] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { state, fetchWeather, setState, setUnit } = useWeather();

  const [isLocating, setIsLocating] = useState(false);

  const [selectedDay, setSelectedDay] = useState<DayOption | null>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cityHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const weatherMethod = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const city = cityInput.trim();

    if (!city) {
      setState((s) => ({ ...s, error: "Enter city name" }));
      return;
    }

    if (!selectedDay) {
      setState((s) => ({ ...s, error: "Select a date" }));
      return;
    }

    if (!state.unit) {
      setState((s) => ({ ...s, error: "Select temperature unit" }));
      return;
    }

    setHasSubmitted(true);

    fetchWeather(cityInput.trim());

    const saveToHistory = (city: string) => {
      setHistory((prev) => {
        const updated = [
          city,
          ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase()),
        ].slice(0, 5);

        localStorage.setItem("cityHistory", JSON.stringify(updated));
        return updated;
      });
    };

    setHasSubmitted(true);
    saveToHistory(city);
    fetchWeather(city);
  };

  const getYourLocation = () => {
   
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Math.round(position.coords.latitude * 10) / 10;
        const lon = Math.round(position.coords.longitude * 10) / 10;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
          );

          if (!res.ok) {
            throw new Error("Weather API error");
          }

          const data = await res.json();

          const city = data.city.name;

          setCityInput(city);
          setHasSubmitted(false);

          console.log("Detected location:", city);
        } catch (err) {
          console.error(err);
          setState((s) => ({
            ...s,
            error: "Failed to fetch location weather",
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setState((s) => ({
          ...s,
          error: "Location permission denied",
        }));
        setIsLocating(false);
      },
    );
  };

  const handleCityChange = (value: string) => {
    setCityInput(value);

    if (value.trim() === "") {
      resetApp();
    }
  };

  const resetApp = () => {
    setHasSubmitted(false);
    setSelectedDay(null);

    setState({
      city: null,
      days: null,
      unit: null,
      error: undefined,
    });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-md-5 info">
              <Info />
            </div>

            <div className="col-md-7 form">
              <FormInfo
                value={cityInput}
                onChange={handleCityChange}
                weatherMethod={weatherMethod}
                locationMethod={getYourLocation}
                isLocating={isLocating}
                history={history}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />

              <div className="row">
                <div className="col-md-4">
                  <ButtDay onSelect={setSelectedDay} selected={selectedDay} />
                </div>

                <div className="col-md-2">
                  <ButtDeg unit={state.unit} onChange={setUnit} />
                </div>

                <div className="col-md-6">
                  <Weather
                    city={state.city}
                    days={hasSubmitted ? state.days : null}
                    unit={state.unit}
                    selectedDay={selectedDay}
                    error={state.error}
                    hasInput={cityInput.trim().length > 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
