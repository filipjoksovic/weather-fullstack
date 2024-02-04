import { EnvironmentBase } from './environment.base';

export const headlessEnvironmentData: EnvironmentBase = {
  production: true,
  backendUrl: 'http://localhost:8080',
  currentWeatherUrl: 'https://api.open-meteo.com/v1/forecast',
  dailyWeatherUrl: 'https://api.open-meteo.com/v1/forecast',
  hourlyWeatherUrl: 'https://api.open-meteo.com/v1/forecast',
  geocodingUrl: 'https://geocoding-api.open-meteo.com/v1/search',
  reverseGeoCodingUrl: 'https://nominatim.openstreetmap.org/reverse.php',
  isHeadless: true,
};

export const environment: EnvironmentBase = {
  ...headlessEnvironmentData,
};
