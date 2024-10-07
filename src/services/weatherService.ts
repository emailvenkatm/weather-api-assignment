// weatherController.ts
// This file contains the controller logic for handling weather-related API requests.
// It validates inputs and fetches weather data using the weatherService.

import axios from 'axios';
import logger from '../utils/logger';
import { WeatherData } from '../types/weatherTypes'; 

/**
 * Fetches weather data from the OpenWeather API based on latitude and longitude.
 * Processes the data to return the current weather conditions, temperature, 
 * temperature classification (hot, cold, moderate), and any active weather alerts.
 *
 * @param lat - Latitude of the location to fetch weather for.
 * @param lon - Longitude of the location to fetch weather for.
 * @returns Promise<WeatherData> - An object containing the weather condition, temperature,
 * temperature classification, and alerts (if any).
 * @throws Error - If the request fails or if an unexpected error occurs.
 */
export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weatherCondition = data.current.weather[0].main; // "Clear", "Rain", etc.
    const temperature = data.current.temp;
    const alerts = data.alerts || [];

    const temperatureClassification = classifyTemperature(temperature);

    logger.info('Weather data fetched successfully for lat=%s, lon=%s', lat, lon);

    return {
      weatherCondition,
      temperature,
      temperatureClassification,
      alerts
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Failed to fetch weather data for lat=%s, lon=%s: %s', lat, lon, error.message);
      throw new Error('Failed to fetch weather data');
    } else {
      logger.error('An unexpected error occurred');
      throw new Error('An unexpected error occurred');
    }
  }
};

/**
 * Classifies temperature as 'hot', 'cold', or 'moderate' based on Celsius.
 * Thresholds:
 * - Above 30°C: Hot
 * - Below 15°C: Cold
 * - Between 15°C and 30°C: Moderate
 */
const classifyTemperature = (temp: number): 'hot' | 'cold' | 'moderate' => {
  if (temp > 30) {
    return 'hot';
  } else if (temp < 15) {
    return 'cold';
  } else {
    return 'moderate';
  }
};
