import { DirectionUnit } from '../../../core/models/api/response/direction.unit';
import { HeightUnit } from '../../../core/models/api/response/height.unit';
import { PercentageUnit } from '../../../core/models/api/response/percentage.unit';
import { PressureUnit } from '../../../core/models/api/response/pressure.unit';
import { SpeedUnit } from '../../../core/models/api/response/speed.unit';
import { TemperatureUnit } from '../../../core/models/api/response/temperature.unit';
import { TimeUnit } from '../../../core/models/api/response/time-format.unit';

export type CurrentWeatherResponseUnits = {
  time: TimeUnit;
  interval: string;
  temperature_2m: TemperatureUnit;
  relative_humidity_2m: PercentageUnit;
  apparent_temperature: TemperatureUnit;
  is_day: '_';
  precipitation: HeightUnit;
  rain: HeightUnit;
  showers: HeightUnit;
  snowfall: HeightUnit;
  weather_code: string;
  cloud_cover: PercentageUnit;
  pressure_msl: PressureUnit;
  surface_pressure: PressureUnit;
  wind_speed_10m: SpeedUnit;
  wind_direction_10m: DirectionUnit;
  wind_gusts_10m: SpeedUnit;
};

export type CurrentWeatherMeasurementsResponse = {
  [key in keyof Omit<CurrentWeatherResponseUnits, 'time' | 'is_day'>]: number;
} & { time: string | number; is_day: 0 | 1 };

export type CurrentWeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentWeatherResponseUnits;
  current: CurrentWeatherMeasurementsResponse;
};
