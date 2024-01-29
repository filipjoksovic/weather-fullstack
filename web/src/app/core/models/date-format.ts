export enum DateFormatEnum {
  SHORT = 'MM/dd/yyyy',
  LONG = 'MMMM dd, yyyy',
}

export type DateFormatConfig = {
  format: DateFormatEnum;
  name: string;
};

export const getDateFormats = (): DateFormatConfig[] => [
  { format: DateFormatEnum.SHORT, name: 'Short (10/31/2019)' },
  { format: DateFormatEnum.LONG, name: 'Long (October 31, 2019)' },
];
