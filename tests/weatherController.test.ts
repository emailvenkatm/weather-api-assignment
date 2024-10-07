import { Request, Response } from 'express';
import { getWeatherByCoordinates } from '../src/controllers/weatherController';
import { fetchWeatherData } from '../src/services/weatherService';

jest.mock('../src/services/weatherService'); // Mock the weather service

describe('getWeatherByCoordinates', () => {
  const mockRequest = (lat: string, lon: string): Partial<Request> => ({
    query: { lat, lon },
  });

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  it('should return 400 when latitude and longitude are missing', async () => {
    const req = mockRequest('', '');
    const res = mockResponse();

    await getWeatherByCoordinates(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Latitude and Longitude are required' });
  });

  it('should fetch weather data when valid lat/lon are provided', async () => {
    const req = mockRequest('37.7749', '-122.4194');
    const res = mockResponse();

    const mockWeatherData = {
      weatherCondition: 'Clear',
      temperature: 22,
      temperatureClassification: 'moderate',
      alerts: [],
    };

    // Mock the weather service response
    (fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    await getWeatherByCoordinates(req as Request, res as Response);

    expect(fetchWeatherData).toHaveBeenCalledWith(37.7749, -122.4194);
    expect(res.json).toHaveBeenCalledWith(mockWeatherData);
  });

  it('should return 500 when the weather service throws an error', async () => {
    const req = mockRequest('37.7749', '-122.4194');
    const res = mockResponse();

    (fetchWeatherData as jest.Mock).mockRejectedValue(new Error('Service Error'));

    await getWeatherByCoordinates(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch weather information' });
  });
});
