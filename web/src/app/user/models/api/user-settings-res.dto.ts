import { TimeFormatEnum } from '@core/models/time-format';
import { DateFormatEnum } from '@core/models/date-format';

export type UserSettingsResDto = {
  dateFormat: DateFormatEnum;
  timeFormat: TimeFormatEnum;
};
