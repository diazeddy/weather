import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import WeatherDisplay from './components/WeatherDisplay';
import FilterHistory from './components/FilterHistory';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  icon: string;
}

interface Filter {
  city: string;
  country?: string;
}

const App: React.FC = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [filterHistory, setFilterHistory] = useState<Filter[]>([]);

  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string, country?: string) => {
    try {
      setError(null);
      const response = await fetch(`http://127.0.0.1:5000/api/weather?city=${city}${country ? `&country=${country}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const fetchFilterHistory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/history');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      setFilterHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchFilterHistory();
  }, []);

  const handleSubmit = (filter: Filter) => {
    fetchWeather(filter.city, filter.country);
    fetchFilterHistory();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <FilterForm onSubmit={handleSubmit} />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
      <FilterHistory history={filterHistory} />
    </div>
  );
};

export default App;