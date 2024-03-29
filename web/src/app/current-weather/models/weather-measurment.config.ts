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
  componentType?: 'text' | 'gauge' | 'compass' | 'weatherIcon';
  order: number;
};

export const componentsToIgnore: CurrentWeatherModelKeys[] = [
  CurrentWeatherModelKeys.time,
  CurrentWeatherModelKeys.weatherCode,
  CurrentWeatherModelKeys.temperature,
  CurrentWeatherModelKeys.windSpeed,
  CurrentWeatherModelKeys.apparentTemperature,
];

export const displaySettings: {
  [key in CurrentWeatherModelKeys]: WeatherMeasurementComponentDisplaySettings;
} = {
  [CurrentWeatherModelKeys.apparentTemperature]: {
    key: CurrentWeatherModelKeys.apparentTemperature,
    icon: 'fa fa-temperature-half',
    title: 'Apparent temperature',
    rowSpan: 1,
    colSpan: 4,
    order: 1,
  },
  [CurrentWeatherModelKeys.surfacePressure]: {
    key: CurrentWeatherModelKeys.surfacePressure,
    icon: 'fa fa-gauge',
    title: 'Surface pressure',
    rowSpan: 2,
    colSpan: 2,
    order: 3,
  },
  [CurrentWeatherModelKeys.temperature]: {
    key: CurrentWeatherModelKeys.temperature,
    icon: 'fa fa-temperature-full',
    title: 'Temperature',
    rowSpan: 2,
    colSpan: 2,
    order: 4,
  },
  [CurrentWeatherModelKeys.cloudCover]: {
    key: CurrentWeatherModelKeys.cloudCover,
    icon: 'fa fa-cloud',
    title: 'Cloud cover',
    rowSpan: 2,
    colSpan: 2,
    componentType: 'gauge',
    order: 5,
  },
  [CurrentWeatherModelKeys.humidity]: {
    key: CurrentWeatherModelKeys.humidity,
    icon: 'fa fa-droplet',
    title: 'Humidity',
    rowSpan: 2,
    colSpan: 2,
    componentType: 'gauge',
    order: 6,
  },
  [CurrentWeatherModelKeys.precipitation]: {
    key: CurrentWeatherModelKeys.precipitation,
    icon: 'fa fa-umbrella',
    title: 'Precipitation',
    rowSpan: 2,
    colSpan: 4,
    order: 7,
  },
  [CurrentWeatherModelKeys.pressure]: {
    key: CurrentWeatherModelKeys.pressure,
    icon: 'fa fa-gauge',
    title: 'Pressure',
    rowSpan: 2,
    colSpan: 2,
    order: 8,
  },
  [CurrentWeatherModelKeys.rain]: {
    key: CurrentWeatherModelKeys.rain,
    icon: 'fa fa-cloud-rain',
    title: 'Rain',
    rowSpan: 2,
    colSpan: 4,
    order: 9,
  },
  [CurrentWeatherModelKeys.showers]: {
    key: CurrentWeatherModelKeys.showers,
    icon: 'fa-solid fa-cloud-showers-heavy',
    title: 'Showers',
    rowSpan: 2,
    colSpan: 2,
    order: 10,
  },
  [CurrentWeatherModelKeys.snowfall]: {
    key: CurrentWeatherModelKeys.snowfall,
    icon: 'fa fa-snowflake',
    title: 'Snowfall',
    rowSpan: 2,
    colSpan: 2,
    order: 11,
  },
  [CurrentWeatherModelKeys.time]: {
    key: CurrentWeatherModelKeys.time,
    icon: 'fa fa-clock',
    title: 'Time',
    rowSpan: 2,
    colSpan: 2,
    order: 12,
  },
  [CurrentWeatherModelKeys.windDirection]: {
    key: CurrentWeatherModelKeys.windDirection,
    icon: 'fa fa-compass',
    title: 'Wind direction',
    rowSpan: 2,
    colSpan: 2,
    order: 13,
    componentType: 'compass',
  },
  [CurrentWeatherModelKeys.windGusts]: {
    key: CurrentWeatherModelKeys.windGusts,
    icon: 'fa fa-user',
    title: 'Wind gusts',
    rowSpan: 2,
    colSpan: 2,
    order: 14,
  },
  [CurrentWeatherModelKeys.windSpeed]: {
    key: CurrentWeatherModelKeys.windSpeed,
    icon: 'fa fa-wind',
    title: 'Wind speed',
    rowSpan: 2,
    colSpan: 2,
    order: 15,
  },
  [CurrentWeatherModelKeys.weatherCode]: {
    key: CurrentWeatherModelKeys.weatherCode,
    icon: 'fa fa-cloud-sun',
    title: 'Weather code',
    rowSpan: 2,
    colSpan: 2,
    order: 16,
    componentType: 'weatherIcon',
  },
};
