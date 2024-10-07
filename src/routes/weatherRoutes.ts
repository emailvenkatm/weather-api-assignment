import { Router } from 'express';
import { getWeatherByCoordinates } from '../controllers/weatherController';

const router = Router();

// Define the route with a GET request, using query parameters
router.get('/', getWeatherByCoordinates);

export default router;
