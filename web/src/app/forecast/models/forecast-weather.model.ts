import {
  WeatherCodeConfig,
  WeatherConfig,
} from '@core/models/api/response/weather-code.enum';
import { TemperatureUnit } from '../../core/models/api/response/temperature.unit';
import { ValueUnit } from '../../core/models/data/value-unit.type';
import { ForecastWeatherResponse } from './api/response/forecast-weather-response';

export type ForecastWeather = {
  latitude: number;
  longitude: number;
  measurements: ForecastMeasurement[];
};

export type ForecastMeasurement = {
  date: string | number;
  maxTemperature: ValueUnit<number, TemperatureUnit>;
  minTemperature: ValueUnit<number, TemperatureUnit>;
  weatherCode: number;
};

export const forecastWeatherHeadlessResponseToForecastMeasurement = (
  response: ForecastWeatherResponse
): ForecastWeather => {
  return {
    latitude: response.latitude,
    longitude: response.longitude,
    measurements: groupForecastResponseMeasurements(response),
  };
};

export const groupForecastResponseMeasurements = (
  response: ForecastWeatherResponse
): ForecastMeasurement[] => {
  return response.daily.time.map(
    (date: string | number, index: number): ForecastMeasurement => {
      const partialMeasurement: Partial<ForecastMeasurement> = {
        date: date ?? new Date(),
      };
      partialMeasurement.maxTemperature = {
        value: response.daily.temperature_2m_max
          ? response.daily.temperature_2m_max[index]
          : 0,
        unit: response.daily_units.temperature_2m_max ?? '°C',
      };

      partialMeasurement.minTemperature = {
        value: response.daily.temperature_2m_min
          ? response.daily.temperature_2m_min[index]
          : 0,
        unit: response.daily_units.temperature_2m_min ?? '°C',
      };

      partialMeasurement.weatherCode = response.daily.weather_code
        ? response.daily.weather_code[index]
        : 0;
      return partialMeasurement as ForecastMeasurement;
    }
  );
};
