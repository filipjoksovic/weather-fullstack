import { TimeFormatEnum } from '@core/models/time-format';
import { DateFormatEnum } from '@core/models/date-format';

export type UserReqDto = {
  dateFormat: DateFormatEnum;
  timeFormat: TimeFormatEnum;
};
