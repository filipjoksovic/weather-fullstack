export type SpeedUnit = 'km/h' | 'm/s' | 'mp/h' | 'kn';

export const getSpeedUnits = () => {
  return ['km/h', 'm/s', 'mp/h', 'kn'];
};

export const speedUnitToSpeedUnitParamMapper = (speedUnit: SpeedUnit) => {
  switch (speedUnit) {
    case 'km/h':
      return 'kmh';
    case 'kn':
      return 'kn';
    case 'm/s':
      return 'ms';
    case 'mp/h':
      return 'mph';
    default:
      exaustiveTypeCheck(speedUnit);
      return '';
  }
};

function exaustiveTypeCheck(value: never) {
  console.error(`Value provided for speed unit ${value} is not supported`);
}
