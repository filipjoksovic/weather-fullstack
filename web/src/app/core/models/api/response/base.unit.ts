import { DirectionUnit } from './direction.unit';
import { HeightUnit } from './height.unit';
import { PercentageUnit } from './percentage.unit';
import { PressureUnit } from './pressure.unit';
import { SpeedUnit } from './speed.unit';
import { TemperatureUnit } from './temperature.unit';
import { TimeUnit } from './time-format.unit';

export type BaseUnit =
  | DirectionUnit
  | HeightUnit
  | PercentageUnit
  | PressureUnit
  | SpeedUnit
  | TemperatureUnit
  | TimeUnit;
