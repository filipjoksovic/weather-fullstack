import { DirectionUnitResponse } from '../../../../core/models/api/response/direction.unit';
import { HeightResponseUnit } from '../../../../core/models/api/response/height.unit';
import { SpeedResponseUnit } from '../../../../core/models/api/response/speed.unit';
import { TemperatureResponseUnit } from '../../../../core/models/api/response/temperature.unit';
import { TimeFormatResponseUnit } from '../../../../core/models/api/response/time-format.unit';

export type ForecastWeatherResponseUnits = {
  time?: TimeFormatResponseUnit;
  temperature_2m_max?: TemperatureResponseUnit;
  temperature_2m_min?: TemperatureResponseUnit;
  apparent_temperature_max?: TemperatureResponseUnit;
  apparent_temperature_min?: TemperatureResponseUnit;
  precipitation_sum?: HeightResponseUnit;
  rain_sum?: HeightResponseUnit;
  showers_sum?: HeightResponseUnit;
  snowfall_sum?: HeightResponseUnit;
  wind_speed_10m_max?: SpeedResponseUnit;
  wind_gusts_10m_max?: SpeedResponseUnit;
  wind_direction_10m_dominant?: DirectionUnitResponse;
};

export type ForecastWeatherMeasurementsResponse = {
  [key in keyof Omit<ForecastWeatherResponseUnits, 'time'>]: number[];
} & { time: string[] | number[] };

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
};
