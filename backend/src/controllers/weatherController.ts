import { Request, Response } from 'express';
import axios from 'axios';
import { addToHistory } from '../models/history';

export const getWeather = async (req: Request, res: Response): Promise<void> => {
  const { city, country } = req.query;

  if (!city || typeof city !== 'string') {
    res.status(400).json({ error: 'City is required and must be a string' });
    return;
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
  
    if (!apiKey) {
      throw new Error('Weather API key is not set');
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}${country ? `,${country}` : ''}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    };

    addToHistory({ city, country: typeof country === 'string' ? country : undefined });

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};