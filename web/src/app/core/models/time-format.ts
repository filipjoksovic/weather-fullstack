export enum TimeFormatEnum {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export type TimeFormat = 'HH:mm' | 'hh:mm a';

export const TimeFormats: Record<TimeFormatEnum, TimeFormatConfig> = {
  [TimeFormatEnum.LONG]: {
    key: TimeFormatEnum.LONG,
    format: 'HH:mm',
    name: 'Long',
  },
  [TimeFormatEnum.SHORT]: {
    key: TimeFormatEnum.SHORT,
    format: 'hh:mm a',
    name: 'Short',
  },
};

export type TimeFormatConfig = {
  key: TimeFormatEnum;
  format: TimeFormat;
  name: string;
};

export const getTimeFormats = (): TimeFormatConfig[] => [
  TimeFormats.LONG,
  TimeFormats.SHORT,
];
