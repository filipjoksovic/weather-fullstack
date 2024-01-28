import { DirectionUnitResponse } from '../response/direction.unit';
import { HeightResponseUnit } from '../response/height.unit';
import { PercentageResponseUnit } from '../response/percentage.unit';
import { PressureUnitResponse } from '../response/pressure.unit';
import { SpeedResponseUnit } from '../response/speed.unit';
import { TemperatureResponseUnit } from '../response/temperature.unit';
import { RadiationResponseUnit } from './radiation.param';

export type HourlyRequest = {
  temperature_2m: TemperatureResponseUnit;
  relative_humidity_2m: PercentageResponseUnit;
  dew_point_2m: TemperatureResponseUnit;
  apparent_temperature: TemperatureResponseUnit;
  pressure_msl: PressureUnitResponse;
  surface_pressure: PressureUnitResponse;
  cloud_cover: PercentageResponseUnit;
  cloud_cover_low: PercentageResponseUnit;
  cloud_cover_mid: PercentageResponseUnit;
  cloud_cover_high: PercentageResponseUnit;
  wind_speed_10m: SpeedResponseUnit;
  wind_speed_80m: SpeedResponseUnit;
  wind_speed_120m: SpeedResponseUnit;
  wind_speed_180m: SpeedResponseUnit;
  wind_direction_10m: DirectionUnitResponse;
  wind_direction_80m: DirectionUnitResponse;
  wind_direction_120m: DirectionUnitResponse;
  wind_direction_180m: DirectionUnitResponse;
  wind_gusts_10m: SpeedResponseUnit;
  shortwave_radiation: RadiationResponseUnit;
  direct_radiation: RadiationResponseUnit;
  direct_normal_irradiance: RadiationResponseUnit;
  diffuse_radiation: RadiationResponseUnit;
  global_tilted_irradiance: RadiationResponseUnit;
  precipitation: HeightResponseUnit;
  snowfall: HeightResponseUnit;
  rain: HeightResponseUnit;
  showers: HeightResponseUnit;
};