import { DirectionUnitResponse } from '../../../core/models/api/response/direction.unit';
import { HeightResponseUnit } from '../../../core/models/api/response/height.unit';
import { PercentageResponseUnit } from '../../../core/models/api/response/percentage.unit';
import { PressureUnitResponse } from '../../../core/models/api/response/pressure.unit';
import { SpeedResponseUnit } from '../../../core/models/api/response/speed.unit';
import { TemperatureResponseUnit } from '../../../core/models/api/response/temperature.unit';
import { TimeFormatResponseUnit } from '../../../core/models/api/response/time-format.unit';

export type CurrentWeatherResponseUnits = {
  time: TimeFormatResponseUnit;
  interval: string;
  temperature_2m: TemperatureResponseUnit;
  relative_humidity_2m: PercentageResponseUnit;
  apparent_temperature: TemperatureResponseUnit;
  is_day: '_';
  precipitation: HeightResponseUnit;
  rain: HeightResponseUnit;
  showers: HeightResponseUnit;
  snowfall: HeightResponseUnit;
  weather_code: string;
  cloud_cover: PercentageResponseUnit;
  pressure_msl: PressureUnitResponse;
  surface_pressure: PressureUnitResponse;
  wind_speed_10m: SpeedResponseUnit;
  wind_direction_10m: DirectionUnitResponse;
  wind_gusts_10m: SpeedResponseUnit;
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
