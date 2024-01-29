export interface EnvironmentBase {
  isHeadless: boolean;
  production: boolean;
  backendUrl: string;
  openMeteoForecastUrl: string;
  openMeteoArchiveUrl: string;
  openMeteoGeocodingUrl: string;
}

export type EnvironmentHeadless = {
  isHeadless: true;
  production: boolean;
};

export type StoredEnvironment = {
  production: boolean;
  backendUrl: string;
  openMeteoForecastUrl: string;
  openMeteoArchiveUrl: string;
  openMeteoGeocodingUrl: string;
};

export type Environment = EnvironmentBase | EnvironmentHeadless;
