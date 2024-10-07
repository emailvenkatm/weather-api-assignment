import { Request, Response } from 'express';
import { fetchWeatherData } from '../services/weatherService';
import logger from '../utils/logger';
import { WeatherData } from '../types/weatherTypes';  // Import the shared type

/**
 * Controller function to handle GET requests for weather data by coordinates.
 * It validates the latitude and longitude query parameters, and if valid, it
 * fetches the weather data from the weatherService.
 *
 * @param req - Express Request object containing lat/lon as query parameters.
 * @param res - Express Response object to send back the weather information or error message.
 */
export const getWeatherByCoordinates = async (req: Request, res: Response): Promise<void> => {
  // Extract latitude and longitude from the request query parameters.  
  const { lat, lon } = req.query;

  // Validate if latitude and longitude are provided.
  if (!lat || !lon) {
    logger.warn('Missing coordinates: lat=%s, lon=%s', lat, lon);
    res.status(400).json({ error: 'Latitude and Longitude are required' });
    return;
  }

  // Parse latitude and longitude to float values from string.
  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lon as string);

  // Check if parsed values are valid and within acceptable ranges for lat/lon.
  if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    logger.warn('Invalid coordinates: lat=%s, lon=%s', lat, lon);
    res.status(400).json({ error: 'Invalid latitude or longitude' });
    return;
  }

  try {
    // Fetch weather data using the weather service for the given coordinates.
    const weatherData: WeatherData = await fetchWeatherData(latitude, longitude);
    // Return the fetched weather data as a JSON response.
    res.json(weatherData);
  } catch (error) {
    // Log the error and return a 500 status code for internal server error.
    logger.error('Error fetching weather data: %s', error);
    res.status(500).json({ error: 'Failed to fetch weather information' });
  }
};
