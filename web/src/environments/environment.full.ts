import { EnvironmentBase } from './environment.base';

export const environmentFullData: EnvironmentBase = {
  production: true,
  backendUrl: 'http://localhost:8080',
  currentWeatherUrl: 'http://localhost:8080/api/weather/current',
  dailyWeatherUrl: 'http://localhost:8080/api/weather/daily',
  hourlyWeatherUrl: 'http://localhost:8080/api/weather/hourly',
  geocodingUrl: 'http://localhost:8080/api/location/search',
  reverseGeoCodingUrl: 'http://localhost:8080/api/location/reverse',
  isHeadless: false,
};

export const environment: EnvironmentBase = {
  ...environmentFullData,
};
