import { WeatherCode } from '@core/models/api/response/weather-code.enum';
import { DirectionUnit } from '../../../../core/models/api/response/direction.unit';
import { HeightUnit } from '../../../../core/models/api/response/height.unit';
import { SpeedUnit } from '../../../../core/models/api/response/speed.unit';
import { TemperatureUnit } from '../../../../core/models/api/response/temperature.unit';
import { TimeUnit } from '../../../../core/models/api/response/time-format.unit';
import { PercentageUnit } from '@core/models/api/response/percentage.unit';

export type ForecastWeatherResponseUnits = {
  time?: TimeUnit;
  temperature_2m_max?: TemperatureUnit;
  temperature_2m_min?: TemperatureUnit;
  apparent_temperature_max?: TemperatureUnit;
  apparent_temperature_min?: TemperatureUnit;
  precipitation_sum?: HeightUnit;
  rain_sum?: HeightUnit;
  showers_sum?: HeightUnit;
  snowfall_sum?: HeightUnit;
  wind_speed_10m_max?: SpeedUnit;
  wind_gusts_10m_max?: SpeedUnit;
  wind_direction_10m_dominant?: DirectionUnit;
  weather_code?: WeatherCode[];
  relative_humidity_2m?: PercentageUnit;
  uv_index?: number[];
  is_day?: number[];
};

export type ForecastWeatherMeasurementsResponse = {
  [key in keyof Omit<ForecastWeatherResponseUnits, 'time'>]: number[];
} & { time: string[] | number[]; weather_code: WeatherCode[] };

export type ForecastWeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: 0;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: ForecastWeatherResponseUnits;
  daily: ForecastWeatherMeasurementsResponse;
  hourly_units: ForecastWeatherResponseUnits;
  hourly: ForecastWeatherMeasurementsResponse;
};
