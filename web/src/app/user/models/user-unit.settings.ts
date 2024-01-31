import { SpeedUnit } from '@core/models/api/response/speed.unit';
import { TemperatureUnit } from '@core/models/api/response/temperature.unit';
import { HeightUnit } from '@core/models/api/response/height.unit';
import { PercentageUnit } from '@core/models/api/response/percentage.unit';
import { DirectionUnit } from '@core/models/api/response/direction.unit';
import { PressureUnit } from '@core/models/api/response/pressure.unit';

export type UserUnitSettings = {
  speed: SpeedUnit;
  temperature: TemperatureUnit;
  height: HeightUnit;
  percentage: PercentageUnit;
  direction: DirectionUnit;
  pressure: PressureUnit;
};
