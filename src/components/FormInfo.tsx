import { Button, Form, Spinner } from "react-bootstrap";
import type { FormEvent } from "react";

interface FormInfoProps {
  value: string;
  onChange: (value: string) => void;
  weatherMethod: (e: FormEvent<HTMLFormElement>) => void;
  locationMethod?: () => void;
  isLocating: boolean;
  history: string[];
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  dayComponent: React.ReactNode;
  degComponent: React.ReactNode;
  suggestions: string[];
  isLoadingSuggestions: boolean;
}

function FormInfo({
  weatherMethod,
  locationMethod,
  isLocating,
  value,
  onChange,
  history,
  showHistory,
  setShowHistory,
  dayComponent,
  degComponent,
  suggestions,
  isLoadingSuggestions,
}: FormInfoProps) {
  return (
    <Form onSubmit={weatherMethod} className="weather-grid">
      <div className="grid-location">
        {locationMethod && (
          <Button
            variant="primary"
            type="button"
            onClick={locationMethod}
            disabled={isLocating}
            className="custom-btn"
          >
            {isLocating ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Detecting...
              </>
            ) : (
              "Your location"
            )}
          </Button>
        )}
      </div>

      <div className="grid-input">
        <div className="input-wrapper">
          <Form.Control
            type="text"
            placeholder="Location"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              if (!value) setShowHistory(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowHistory(false), 150);
            }}
            autoComplete="off"
          />

          {showHistory && (suggestions.length > 0 || history.length > 0) && (
            <div className="history-popup">
              {isLoadingSuggestions && (
                <div className="history-item">Searching...</div>
              )}

              {suggestions.length > 0
                ? suggestions.map((city) => (
                    <div
                      key={city}
                      className="history-item"
                      onMouseDown={() => {
                        onChange(city);
                        setShowHistory(false);
                      }}
                    >
                      {city}
                    </div>
                  ))
                : history.map((city) => (
                    <div
                      key={city}
                      className="history-item"
                      onMouseDown={() => {
                        onChange(city);
                        setShowHistory(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid-day">{dayComponent}</div>
      <div className="grid-deg">{degComponent}</div>

      <div className="grid-submit">
        <Button variant="primary" type="submit" className="custom-btn">
          Get weather
        </Button>
      </div>
    </Form>
  );
}

export default FormInfo;
