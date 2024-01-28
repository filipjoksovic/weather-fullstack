import { DirectionUnitResponse } from './direction.unit';
import { HeightResponseUnit } from './height.unit';
import { PercentageResponseUnit } from './percentage.unit';
import { PressureUnitResponse } from './pressure.unit';
import { SpeedResponseUnit } from './speed.unit';
import { TemperatureResponseUnit } from './temperature.unit';
import { TimeFormatResponseUnit } from './time-format.unit';

export type BaseUnit =
  | DirectionUnitResponse
  | HeightResponseUnit
  | PercentageResponseUnit
  | PressureUnitResponse
  | SpeedResponseUnit
  | TemperatureResponseUnit
  | TimeFormatResponseUnit;
