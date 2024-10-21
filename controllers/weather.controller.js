import * as weatherService from '../services/weather.service.js';

export const createWeather = (req, res) => {
    const newRecord = weatherService.createWeather(req.body);
    res.status(201).json(newRecord);
};

export const deleteWeather = (req, res) => {
    const { id } = req.params;
    weatherService.deleteWeather(parseInt(id));
    res.json({ message: "Ob-havo ma'lumoti o'chirildi" });
};

export const updateWeather = (req, res) => {
    const { id } = req.params;
    const updatedRecord = weatherService.updateWeather(parseInt(id), req.body);
    if (updatedRecord) {
        res.json(updatedRecord);
    } else {
        res.status(404).json({ message: "Ob-havo ma'lumoti topilmadi" });
    }
};

export const getWeatherById = (req, res) => {
    const { id } = req.params;
    const record = weatherService.getWeatherById(parseInt(id));
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({ message: 'Ob-havo ma\'lumoti topilmadi' });
    }
};

export const getPaginatedWeather = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const results = weatherService.getPaginateWeather(page, limit);
    res.json({
        data: results.data,
        page,
        limit,
        totalPages: Math.ceil(results.totalRecords / limit),
        totalRecords: results.totalRecords,
    });
};

export const getWeatherByCity = (req, res) => {
    const { city } = req.query;
    const filteredRecords = weatherService.getWeatherByCity(city);
    res.json({ data: filteredRecords });
};
