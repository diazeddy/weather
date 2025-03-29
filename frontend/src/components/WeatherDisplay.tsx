import React from 'react';

interface WeatherData {
    temperature: number;
    humidity: number;
    condition: string;
    icon: string;
}

interface WeatherDisplayProps {
    data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
    return (
        <div className="weather-display">
            <h2>Current Weather</h2>
            <img src={data.icon} alt={data.condition} />
            <p>Temperature: {data.temperature}°C</p>
            <p>Humidity: {data.humidity}%</p>
            <p>Condition: {data.condition}</p>
        </div>
    );
};

export default WeatherDisplay;