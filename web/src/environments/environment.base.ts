export interface EnvironmentBase {
  isHeadless: boolean;
  production: boolean;
  backendUrl: string;
  currentWeatherUrl: string;
  dailyWeatherUrl: string;
  hourlyWeatherUrl: string;
  geocodingUrl: string;
  reverseGeoCodingUrl: string;
}

export type Environment = EnvironmentBase;
