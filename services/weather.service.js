import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Hozirgi faylning to'liq yo'li va direktoriyasi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let weather = [];
let currentId = 1;

const loadWeatherDataFromFile = () => {
    const filePath = path.join(__dirname, '../data/weather.json');
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        weather = data;
        currentId = weather.length + 1;
    } catch (error) {
        console.error('Error loading weather data from file:', error);
    }
};

const saveWeatherDataToFile = () => {
    const filePath = path.join(__dirname, '../data/weather.json');
    fs.writeFileSync(filePath, JSON.stringify(weather, null, 2));
};

const createWeather = (data) => {
    const newRecord = { id: currentId++, ...data };
    weather.push(newRecord);
    saveWeatherDataToFile();
    return newRecord;
};

const deleteWeather = (id) => {
    weather = weather.filter(record => record.id !== id);
    saveWeatherDataToFile();
};

const updateWeather = (id, data) => {
    const recordIndex = weather.findIndex(record => record.id === id);
    if (recordIndex !== -1) {
        const updatedRecord = { id, ...data };
        weather[recordIndex] = updatedRecord;
        saveWeatherDataToFile();
        return updatedRecord;
    }
    return null;
};

const getWeatherById = (id) => {
    return weather.find(record => record.id === id);
};

const getPaginateWeather = (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return {
        data: weather.slice(startIndex, endIndex),
        totalRecords: weather.length,
    };
};

const getWeatherByCity = (city) => {
    return weather.filter(record => record.city.toLowerCase() === city.toLowerCase());
};

loadWeatherDataFromFile();

export { createWeather, deleteWeather, updateWeather, getWeatherById, getPaginateWeather, getWeatherByCity };
