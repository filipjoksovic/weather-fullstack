import { BaseUnit } from '@core/models/api/response/base.unit';
import { CurrentWeatherModelKeys } from './cw-req-keys.map';

export type WeatherMeasurementComponentDisplaySettings = {
  key: CurrentWeatherModelKeys;
  icon: string;
  title: string;
  value?: number | string;
  unit?: BaseUnit;
  rowSpan?: number;
  colSpan?: number;
};

export const displaySettings: {
  [key in CurrentWeatherModelKeys]: WeatherMeasurementComponentDisplaySettings;
} = {
  [CurrentWeatherModelKeys.apparentTemperature]: {
    key: CurrentWeatherModelKeys.apparentTemperature,
    icon: 'fa fa-temperature-half',
    title: 'Apparent temperature',
    rowSpan: 4,
    colSpan: 4,
  },
  [CurrentWeatherModelKeys.surfacePressure]: {
    key: CurrentWeatherModelKeys.surfacePressure,
    icon: 'fa fa-gauge',
    title: 'Surface pressure',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.temperature]: {
    key: CurrentWeatherModelKeys.temperature,
    icon: 'fa fa-temperature-full',
    title: 'Temperature',
    rowSpan: 3,
    colSpan: 3,
  },
  [CurrentWeatherModelKeys.cloudCover]: {
    key: CurrentWeatherModelKeys.cloudCover,
    icon: 'fa fa-cloud',
    title: 'Cloud cover',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.humidity]: {
    key: CurrentWeatherModelKeys.humidity,
    icon: 'fa fa-droplet',
    title: 'Humidity',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.precipitation]: {
    key: CurrentWeatherModelKeys.precipitation,
    icon: 'fa fa-umbrella',
    title: 'Precipitation',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.pressure]: {
    key: CurrentWeatherModelKeys.pressure,
    icon: 'fa fa-gauge',
    title: 'Pressure',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.rain]: {
    key: CurrentWeatherModelKeys.rain,
    icon: 'fa fa-cloud-rain',
    title: 'Rain',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.showers]: {
    key: CurrentWeatherModelKeys.showers,
    icon: 'fa-solid fa-cloud-showers-heavy',
    title: 'Showers',
    rowSpan: 4,
    colSpan: 4,
  },
  [CurrentWeatherModelKeys.snowfall]: {
    key: CurrentWeatherModelKeys.snowfall,
    icon: 'fa fa-snowflake',
    title: 'Snowfall',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.time]: {
    key: CurrentWeatherModelKeys.time,
    icon: 'fa fa-clock',
    title: 'Time',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.windDirection]: {
    key: CurrentWeatherModelKeys.windDirection,
    icon: 'fa fa-compass',
    title: 'Wind direction',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.windGusts]: {
    key: CurrentWeatherModelKeys.windGusts,
    icon: 'fa fa-user',
    title: 'Wind gusts',
    rowSpan: 2,
    colSpan: 2,
  },
  [CurrentWeatherModelKeys.windSpeed]: {
    key: CurrentWeatherModelKeys.windSpeed,
    icon: 'fa fa-wind',
    title: 'Wind speed',
    rowSpan: 2,
    colSpan: 2,
  },
};
