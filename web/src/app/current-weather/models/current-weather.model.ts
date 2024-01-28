import { BaseUnit } from '../../core/models/api/response/base.unit';
import { DirectionUnitResponse } from '../../core/models/api/response/direction.unit';
import { HeightResponseUnit } from '../../core/models/api/response/height.unit';
import { PercentageResponseUnit } from '../../core/models/api/response/percentage.unit';
import { PressureUnitResponse } from '../../core/models/api/response/pressure.unit';
import { SpeedResponseUnit } from '../../core/models/api/response/speed.unit';
import { TemperatureResponseUnit } from '../../core/models/api/response/temperature.unit';
import { ValueUnit } from '../../core/models/data/value-unit.type';
import {
  CurrentWeatherModelKeys,
  CurrentWeatherModelKeysToRequestKeys,
  CurrentWeatherResponseKeysToModelKeys,
} from './cw-req-keys.map';
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
  measurements: {
    key: CurrentWeatherModelKeys;
    unit: BaseUnit;
    value: number | string;
  }[];
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
    measurements: [],
  };
  for (const key of Object.keys(response.current_units) as Array<
    keyof CurrentWeatherResponseUnits
  >) {
    partialWeather.measurements?.push({
      key: CurrentWeatherModelKeys[
        CurrentWeatherResponseKeysToModelKeys[
          key as keyof typeof CurrentWeatherResponseKeysToModelKeys
        ] as keyof typeof CurrentWeatherModelKeys
      ],
      unit: response.current_units[
        key as keyof CurrentWeatherResponseUnits
      ] as BaseUnit,
      value: response.current[key as keyof CurrentWeatherMeasurementsResponse],
    });
  }

  console.log('Partial weather', partialWeather);
  return partialWeather as CurrentWeather;
};
