import { DirectionUnitResponse } from '../../core/models/api/response/direction.unit';
import { HeightResponseUnit } from '../../core/models/api/response/height.unit';
import { PercentageResponseUnit } from '../../core/models/api/response/percentage.unit';
import { PressureUnitResponse } from '../../core/models/api/response/pressure.unit';
import { SpeedResponseUnit } from '../../core/models/api/response/speed.unit';
import { TemperatureResponseUnit } from '../../core/models/api/response/temperature.unit';
import { ValueUnit } from '../../core/models/data/value-unit.type';
import { CurrentWeatherResponseKeysToModelKeys } from './cw-req-keys.map';
import {
  CurrentWeatherMeasurementsResponse,
  CurrentWeatherResponse,
  CurrentWeatherResponseUnits,
} from './response/current-weather-response';

export type BaseWeatherModel = {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
};

export type WeatherMeasurementModel = {
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

export type CurrentWeather = BaseWeatherModel & WeatherMeasurementModel;

export const currentWeatherHeadlessResponseToCurrentWeather = (
  response: CurrentWeatherResponse
): CurrentWeather => {
  const partialWeather: Partial<CurrentWeather> = {
    latitude: response.latitude,
    longitude: response.longitude,
    timezone: response.timezone,
    elevation: response.elevation,
  };
  for (const key of Object.keys(response.current_units) as Array<
    keyof CurrentWeatherResponseUnits
  >) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    partialWeather[
      CurrentWeatherResponseKeysToModelKeys[
        key as keyof typeof CurrentWeatherResponseKeysToModelKeys
      ] as keyof CurrentWeather
    ] = {
      unit: response.current_units[key as keyof CurrentWeatherResponseUnits],
      value: response.current[key as keyof CurrentWeatherMeasurementsResponse],
    };
  }

  console.log('Partial weather', partialWeather);
  return partialWeather as CurrentWeather;
};
