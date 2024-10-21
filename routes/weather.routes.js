import { Router } from 'express';
import {
    createWeather,
    deleteWeather,
    updateWeather,
    getWeatherById,
    getPaginatedWeather,
    getWeatherByCity
} from '../controllers/weather.controller.js';

const router = Router();

router.post('/', createWeather);
router.delete('/:id', deleteWeather);
router.put('/:id', updateWeather);
router.get('/:id', getWeatherById);
router.get('/', getPaginatedWeather);
router.get('/city', getWeatherByCity);

export default router;


