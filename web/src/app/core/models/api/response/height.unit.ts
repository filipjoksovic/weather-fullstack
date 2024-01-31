export type HeightUnit = 'mm' | 'inch';

export const getHeightUnits = () => {
  return ['mm', 'inch'];
};

export const heightUnitToHeightUnitParamMapper = (heightUnit: HeightUnit) => {
  switch (heightUnit) {
    case 'mm':
      return 'mm';
    case 'inch':
      return 'inch';
    default:
      exhaustiveTypeCheck(heightUnit);
      return '';
  }
};

function exhaustiveTypeCheck(value: never) {
  console.error(`Value provided for height unit ${value} is not supported`);
}
