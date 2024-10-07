import axios from 'axios';
import { fetchWeatherData } from '../src/services/weatherService';
import { WeatherData } from '../src/types/weatherTypes'; // Import the shared type

jest.mock('axios'); // Mock axios for all requests

describe('fetchWeatherData', () => {
  it('should fetch weather data and return processed response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>; // Add semicolon here

    // Mock response from OpenWeather API
    const mockResponse = {
      data: {
        current: {
          weather: [{ main: 'Clear' }],
          temp: 22,
        },
        alerts: [],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const lat = 37.7749;
    const lon = -122.4194;
    const result: WeatherData = await fetchWeatherData(lat, lon);

    expect(result).toEqual({
      weatherCondition: 'Clear',
      temperature: 22,
      temperatureClassification: 'moderate',
      alerts: [],
    });
  });

  it('should throw an error if the request fails', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    const lat = 37.7749;
    const lon = -122.4194;

    await expect(fetchWeatherData(lat, lon)).rejects.toThrow('Failed to fetch weather data');
  });
});
