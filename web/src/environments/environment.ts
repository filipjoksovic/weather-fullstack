import { EnvironmentBase } from './environment.base';

export const environment: EnvironmentBase = {
  production: true,
  backendUrl: 'http://localhost:8080',
  currentWeatherUrl: 'https://api.open-meteo.com/v1/',
  dailyWeatherUrl: 'https://api.open-meteo.com/v1/',
  hourlyWeatherUrl: 'https://api.open-meteo.com/v1/',
  geocodingUrl: 'https://geocoding-api.open-meteo.com/v1/',
  reverseGeoCodingUrl: 'https://nominatim.openstreetmap.org/reverse.php',
  isHeadless: false,
};
