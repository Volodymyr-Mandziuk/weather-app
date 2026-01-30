import { useWeather } from "./hooks/useWeather";

function App() {
  const { state, fetchWeather, setState } = useWeather();

  return (
    <>
      <h1>Weather App</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const city = new FormData(e.currentTarget).get("city") as string;
          fetchWeather(city);
        }}
      >
        <input name="city" placeholder="Enter city" />
        <button type="submit">Get weather</button>
      </form>

      {state.error && <p>{state.error}</p>}

      {state.days.map((day) => (
        <div key={day.date}>
          <p>{day.date}</p>
          <p>
            {state.unit === "C" ? day.tempC : day.tempF}°
          </p>
          <p>{day.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
