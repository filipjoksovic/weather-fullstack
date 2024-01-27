import { DirectionUnitResponse } from '../../core/models/api/response/direction.unit';
import { HeightResponseUnit } from '../../core/models/api/response/height.unit';
import { PercentageResponseUnit } from '../../core/models/api/response/percentage.unit';
import { PressureUnitResponse } from '../../core/models/api/response/pressure.unit';
import { SpeedResponseUnit } from '../../core/models/api/response/speed.unit';
import { TemperatureResponseUnit } from '../../core/models/api/response/temperature.unit';
import { ValueUnit } from '../../core/models/data/value-unit.type';
import { CurrentWeatherResponse } from './response/current-weather-response';

export type CurrentWeather = {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  temperature: ValueUnit<number, TemperatureResponseUnit>;
  humidity: ValueUnit<number, PercentageResponseUnit>;
  apparentTemperature: ValueUnit<number, TemperatureResponseUnit>;
  precipitation: ValueUnit<number, HeightResponseUnit>;
  rain: ValueUnit<number, HeightResponseUnit>;
  showers: ValueUnit<number, HeightResponseUnit>;
  snowfall: ValueUnit<number, HeightResponseUnit>;
  cloudCover: ValueUnit<number, PercentageResponseUnit>;
  pressure: ValueUnit<number, PressureUnitResponse>;
  surfacePressure: ValueUnit<number, PressureUnitResponse>;
  windSpeed: ValueUnit<number, SpeedResponseUnit>;
  windDirection: ValueUnit<number, DirectionUnitResponse>;
  windGusts: ValueUnit<number, SpeedResponseUnit>;
};

export const currentWeatherHeadlessResponseToCurrentWeather = (
  response: CurrentWeatherResponse
): CurrentWeather => {
  return {
    latitude: response.latitude,
    longitude: response.longitude,
    timezone: response.timezone,
    elevation: response.elevation,
    temperature: {
      unit: response.current_units.temperature_2m,
      value: response.current.temperature_2m,
    },
    humidity: {
      unit: response.current_units.relative_humidity_2m,
      value: response.current.relative_humidity_2m,
    },
    apparentTemperature: {
      unit: response.current_units.apparent_temperature,
      value: response.current.apparent_temperature,
    },
    precipitation: {
      unit: response.current_units.precipitation,
      value: response.current.precipitation,
    },
    rain: {
      unit: response.current_units.rain,
      value: response.current.rain,
    },
    showers: {
      unit: response.current_units.showers,
      value: response.current.showers,
    },
    snowfall: {
      unit: response.current_units.snowfall,
      value: response.current.snowfall,
    },
    cloudCover: {
      unit: response.current_units.cloud_cover,
      value: response.current.cloud_cover,
    },
    pressure: {
      unit: response.current_units.pressure_msl,
      value: response.current.pressure_msl,
    },
    surfacePressure: {
      unit: response.current_units.surface_pressure,
      value: response.current.surface_pressure,
    },
    windSpeed: {
      unit: response.current_units.wind_speed_10m,
      value: response.current.wind_speed_10m,
    },
    windGusts: {
      unit: response.current_units.wind_gusts_10m,
      value: response.current.wind_gusts_10m,
    },
    windDirection: {
      unit: response.current_units.wind_direction_10m,
      value: response.current.wind_direction_10m,
    },
  } as CurrentWeather;
};
