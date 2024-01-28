import { CurrentWeatherModelKeys } from '../../../../current-weather/models/cw-req-keys.map';

export type ForecastDetailsRequestParams =
  | 'precipitation_sum'
  | 'rain_sum'
  | 'showers_sum'
  | 'snowfall_sum'
  | 'wind_speed_10m_max'
  | 'wind_gusts_10m_max'
  | 'wind_direction_10m_dominant'
  | 'apparent_temperature_max'
  | 'apparent_temperature_min'
  | 'temperature_2m_max'
  | 'temperature_2m_min';

export const currentWeatherModelKeyToDailyForecastParams: {
  [key in CurrentWeatherModelKeys]: ForecastDetailsRequestParams[];
} = {
  [CurrentWeatherModelKeys.apparentTemperature]: [
    'apparent_temperature_max',
    'apparent_temperature_min',
  ],
  [CurrentWeatherModelKeys.cloudCover]: [],
  [CurrentWeatherModelKeys.humidity]: [],
  [CurrentWeatherModelKeys.precipitation]: ['precipitation_sum'],
  [CurrentWeatherModelKeys.pressure]: [],
  [CurrentWeatherModelKeys.rain]: ['rain_sum'],
  [CurrentWeatherModelKeys.showers]: ['showers_sum'],
  [CurrentWeatherModelKeys.snowfall]: ['snowfall_sum'],
  [CurrentWeatherModelKeys.surfacePressure]: [],
  [CurrentWeatherModelKeys.temperature]: [
    'temperature_2m_max',
    'temperature_2m_min',
  ],
  [CurrentWeatherModelKeys.time]: [],
  [CurrentWeatherModelKeys.windDirection]: ['wind_direction_10m_dominant'],
  [CurrentWeatherModelKeys.windGusts]: ['wind_gusts_10m_max'],
  [CurrentWeatherModelKeys.windSpeed]: ['wind_speed_10m_max'],
};

export const isParameterSupported = (
  parameter: CurrentWeatherModelKeys
): parameter is CurrentWeatherModelKeys =>
  Object.hasOwn(currentWeatherModelKeyToDailyForecastParams, parameter) &&
  currentWeatherModelKeyToDailyForecastParams[parameter].length > 0;
