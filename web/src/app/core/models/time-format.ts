export enum TimeFormatEnum {
  SHORT = 'HH:mm',
  LONG = 'hh:mm a',
}

export type TimeFormatConfig = {
  format: TimeFormatEnum;
  name: string;
};

export const getTimeFormats = (): TimeFormatConfig[] => [
  { format: TimeFormatEnum.SHORT, name: 'Short (10:00PM)' },
  { format: TimeFormatEnum.LONG, name: 'Long (22:00)' },
];
