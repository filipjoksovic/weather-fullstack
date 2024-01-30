import { DateFormatEnum } from '@core/models/date-format';
import { TimeFormat, TimeFormatEnum } from '@core/models/time-format';

export type UserSettings = {
  dateFormat: DateFormatEnum;
  timeFormat: TimeFormatEnum;
};
