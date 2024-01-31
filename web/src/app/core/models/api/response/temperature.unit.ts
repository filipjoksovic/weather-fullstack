export type TemperatureUnit = '°C' | '°F';

export const getTemperatureUnits = () => {
  return ['°C', '°F'];
};

export const temperatureUnitToTemperatureUnitParamMapper = (
  temperatureUnit: TemperatureUnit
) => {
  switch (temperatureUnit) {
    case '°C':
      return 'celsius';
    case '°F':
      return 'fahrenheit';
    default:
      exhaustiveTypeCheck(temperatureUnit);
      return '';
  }
};

function exhaustiveTypeCheck(value: never) {
  console.error(
    `Value provided for temperature unit ${value} is not supported`
  );
}
