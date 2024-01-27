import { TemperatureResponseUnit } from '../../../../core/models/api/response/temperature.unit';
import { TimeFormatResponseUnit } from '../../../../core/models/api/response/time-format.unit';

export type ForecastWeatherResponseUnits = {
  time: TimeFormatResponseUnit;
  temperature_2m_max: TemperatureResponseUnit;
  temperature_2m_min: TemperatureResponseUnit;
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
