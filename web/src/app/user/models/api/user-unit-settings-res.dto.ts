import { SpeedUnit } from '@core/models/api/response/speed.unit';
import { TemperatureUnit } from '@core/models/api/response/temperature.unit';
import { HeightUnit } from '@core/models/api/response/height.unit';
import { PercentageUnit } from '@core/models/api/response/percentage.unit';
import { DirectionUnit } from '@core/models/api/response/direction.unit';
import { PressureUnit } from '@core/models/api/response/pressure.unit';
import { UserSettingsResDto } from './user-settings-res.dto';
import { UserUnitSettings } from '../user-unit.settings';

export type UserUnitSettingsResDto = {
  speed: SpeedUnit;
  temperature: TemperatureUnit;
  height: HeightUnit;
  percentage: PercentageUnit;
  direction: DirectionUnit;
  pressure: PressureUnit;
};

export const userUnitSettingsResToUserUnitSettings = (
  dto: UserUnitSettingsResDto
): UserUnitSettings => {
  return {
    speed: dto.speed,
    temperature: dto.temperature,
    height: dto.height,
    percentage: dto.percentage,
    direction: dto.direction,
    pressure: dto.pressure,
  };
};
