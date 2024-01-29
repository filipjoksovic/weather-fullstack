import { StoredEnvironment } from './environment.base';

export const environment: StoredEnvironment = {
  production: true,
  backendUrl: 'http://localhost:8080',
  openMeteoForecastUrl: 'https://api.open-meteo.com/v1/',
  openMeteoArchiveUrl: 'https://archive-api.open-meteo.com/v1/',
  openMeteoGeocodingUrl: 'https://geocoding-api.open-meteo.com/v1/',
};
