export enum DateFormatEnum {
  SHORT = 'SHORT',
  LONG = 'LONG',
}

export type DateFormat = 'MM/dd/yyyy' | 'MMMM dd, yyyy';

export const DateFormats: Record<DateFormatEnum, DateFormatConfig> = {
  [DateFormatEnum.SHORT]: {
    key: DateFormatEnum.SHORT,
    format: 'MM/dd/yyyy',
    name: 'Short',
  },
  [DateFormatEnum.LONG]: {
    key: DateFormatEnum.LONG,
    format: 'MMMM dd, yyyy',
    name: 'Long',
  },
};

export type DateFormatConfig = {
  key: DateFormatEnum;
  format: DateFormat;
  name: string;
};

export const getDateFormats = (): DateFormatConfig[] => [
  DateFormats.SHORT,
  DateFormats.LONG,
];
