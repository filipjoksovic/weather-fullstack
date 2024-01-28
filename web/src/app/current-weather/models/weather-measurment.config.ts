import { BaseUnit } from '@core/models/api/response/base.unit';
import { CurrentWeatherModelKeys } from './cw-req-keys.map';

export type WeatherMeasurementComponentDisplaySettings = {
  key: CurrentWeatherModelKeys;
  icon: string;
  title: string;
  value?: number | string;
  unit?: BaseUnit;
};

export const displaySettings: {
  [key in CurrentWeatherModelKeys]: WeatherMeasurementComponentDisplaySettings;
} = {
  [CurrentWeatherModelKeys.apparentTemperature]: {
    key: CurrentWeatherModelKeys.apparentTemperature,
    icon: 'fa fa-temperature-half',
    title: 'Apparent temperature',
  },
  [CurrentWeatherModelKeys.surfacePressure]: {
    key: CurrentWeatherModelKeys.surfacePressure,
    icon: 'fa fa-gauge',
    title: 'Surface pressure',
  },
  [CurrentWeatherModelKeys.temperature]: {
    key: CurrentWeatherModelKeys.temperature,
    icon: 'fa fa-temperature-full',
    title: 'Temperature',
  },
  [CurrentWeatherModelKeys.cloudCover]: {
    key: CurrentWeatherModelKeys.cloudCover,
    icon: 'fa fa-cloud',
    title: 'Cloud cover',
  },
  [CurrentWeatherModelKeys.humidity]: {
    key: CurrentWeatherModelKeys.humidity,
    icon: 'fa fa-droplet',
    title: 'Humidity',
  },
  [CurrentWeatherModelKeys.precipitation]: {
    key: CurrentWeatherModelKeys.precipitation,
    icon: 'fa fa-umbrella',
    title: 'Precipitation',
  },
  [CurrentWeatherModelKeys.pressure]: {
    key: CurrentWeatherModelKeys.pressure,
    icon: 'fa fa-gauge',
    title: 'Pressure',
  },
  [CurrentWeatherModelKeys.rain]: {
    key: CurrentWeatherModelKeys.rain,
    icon: 'fa fa-cloud-rain',
    title: 'Rain',
  },
  [CurrentWeatherModelKeys.showers]: {
    key: CurrentWeatherModelKeys.showers,
    icon: 'fa-solid fa-cloud-showers-heavy',
    title: 'Showers',
  },
  [CurrentWeatherModelKeys.snowfall]: {
    key: CurrentWeatherModelKeys.snowfall,
    icon: 'fa fa-snowflake',
    title: 'Snowfall',
  },
  [CurrentWeatherModelKeys.time]: {
    key: CurrentWeatherModelKeys.time,
    icon: 'fa fa-clock',
    title: 'Time',
  },
  [CurrentWeatherModelKeys.windDirection]: {
    key: CurrentWeatherModelKeys.windDirection,
    icon: 'fa fa-compass',
    title: 'Wind direction',
  },
  [CurrentWeatherModelKeys.windGusts]: {
    key: CurrentWeatherModelKeys.windGusts,
    icon: 'fa fa-user',
    title: 'Wind gusts',
  },
  [CurrentWeatherModelKeys.windSpeed]: {
    key: CurrentWeatherModelKeys.windSpeed,
    icon: 'fa fa-wind',
    title: 'Wind speed',
  },
};
