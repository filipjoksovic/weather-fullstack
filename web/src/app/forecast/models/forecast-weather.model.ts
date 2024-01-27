import { TemperatureResponseUnit } from '../../core/models/api/response/temperature.unit';
import { ValueUnit } from '../../core/models/data/value-unit.type';
import { ForecastWeatherResponse } from './api/response/forecast-weather-response';

export type ForecastWeather = {
  latitude: number;
  longitude: number;
  measurements: ForecastMeasurement[];
};

export type ForecastMeasurement = {
  date: string | number;
  maxTemperature: ValueUnit<number, TemperatureResponseUnit>;
  minTemperature: ValueUnit<number, TemperatureResponseUnit>;
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
    (date: string | number, index: number): ForecastMeasurement => ({
      date: date,
      maxTemperature: {
        value: response.daily.temperature_2m_max[index],
        unit: response.daily_units.temperature_2m_max,
      },
      minTemperature: {
        value: response.daily.temperature_2m_min[index],
        unit: response.daily_units.temperature_2m_max,
      },
    })
  );
};
