export enum WeatherCode {
  CLEAR = 0,
  MAINLY_CLEAR = 1,
  PARTLY_CLOUDY = 2,
  OVERCAST = 3,
  FOGGY = 45,
  DEPOSITING_RIME = 48,
  LIGHT_DRIZZLE = 51,
  DRIZZLE = 53,
  HEAVY_DRIZZLE = 55,
  LIGHT_FREEZING_DRIZZLE = 56,
  HEAVY_FREEZING_DRIZZLE = 57,
  LIGHT_RAIN = 61,
  RAIN = 63,
  HEAVY_RAIN = 65,
  LIGHT_FREEZING_RAING = 66,
  HEAVY_FREEZING_RAIN = 67,
  SLIGHT_SNOW = 71,
  SNOW = 73,
  HEAVY_SNOW = 75,
  SNOW_GRAINS = 77,
  SLIGHT_RAIN_SHOWER = 80,
  RAIN_SHOWER = 81,
  HEAVY_RAIN_SHOWER = 82,
  SLIGHT_SNOW_SHOWER = 84,
  HEAVY_SNOW_SHOWER = 85,
  SLIGHT_THUNDERSTORM = 86,
  THUNDERSTORM = 95,
}

export type WeatherConfig = {
  icon: string;
  name: string;
  description?: string;
};

export const WeatherCodeConfig: Record<WeatherCode, WeatherConfig> = {
  [WeatherCode.CLEAR]: {
    icon: 'wi wi-wmo4680-00',
    name: 'Clear',
  },
  [WeatherCode.MAINLY_CLEAR]: {
    icon: 'wi wi-wmo4680-01',
    name: 'Mainly clear',
  },
  [WeatherCode.PARTLY_CLOUDY]: {
    icon: 'wi wi-wmo4680-02',
    name: 'Partly cloudy',
  },
  [WeatherCode.OVERCAST]: {
    icon: 'wi wi-wmo4680-03',
    name: 'Overcast',
  },
  [WeatherCode.FOGGY]: {
    icon: 'wi wi-wmo4680-30',
    name: 'Foggy',
  },
  [WeatherCode.DEPOSITING_RIME]: {
    icon: 'wi wi-wmo4680-48',
    name: 'Depositing rime',
  },
  [WeatherCode.LIGHT_DRIZZLE]: {
    icon: 'wi wi-wmo4680-51',
    name: 'Light drizzle',
  },
  [WeatherCode.DRIZZLE]: {
    icon: 'wi wi-wmo4680-53',
    name: 'Drizzle',
  },
  [WeatherCode.HEAVY_DRIZZLE]: {
    icon: 'wi wi-wmo4680-55',
    name: 'Heavy drizzle',
  },
  [WeatherCode.LIGHT_FREEZING_DRIZZLE]: {
    icon: 'wi wi-wmo4680-56',
    name: 'Light freezing drizzle',
  },
  [WeatherCode.HEAVY_FREEZING_DRIZZLE]: {
    icon: 'wi wi-wmo4680-57',
    name: 'Heavy freezing drizzle',
  },
  [WeatherCode.LIGHT_RAIN]: {
    icon: 'wi wi-wmo4680-61',
    name: 'Light rain',
  },
  [WeatherCode.RAIN]: {
    icon: 'wi wi-wmo4680-63',
    name: 'Rain',
  },
  [WeatherCode.HEAVY_RAIN]: {
    icon: 'wi wi-wmo4680-65',
    name: 'Heavy rain',
  },
  [WeatherCode.LIGHT_FREEZING_RAING]: {
    icon: 'wi wi-wmo4680-66',
    name: 'Light freezing rain',
  },
  [WeatherCode.HEAVY_FREEZING_RAIN]: {
    icon: 'wi wi-wmo4680-67',
    name: 'Heavy freezing rain',
  },
  [WeatherCode.SLIGHT_SNOW]: {
    icon: 'wi wi-wmo4680-71',
    name: 'Slight snow',
  },
  [WeatherCode.SNOW]: {
    icon: 'wi wi-wmo4680-73',
    name: 'Snow',
  },
  [WeatherCode.HEAVY_SNOW]: {
    icon: 'wi wi-wmo4680-01',
    name: 'Heavy snow',
  },
  [WeatherCode.SNOW_GRAINS]: {
    icon: 'wi wi-wmo4680-77',
    name: 'Snow grains',
  },
  [WeatherCode.SLIGHT_RAIN_SHOWER]: {
    icon: 'wi wi-wmo4680-80',
    name: 'Slight rain shower',
  },
  [WeatherCode.RAIN_SHOWER]: {
    icon: 'wi wi-wmo4680-81',
    name: 'Rain shower',
  },
  [WeatherCode.HEAVY_RAIN_SHOWER]: {
    icon: 'wi wi-wmo4680-82',
    name: 'Heavy rain shower',
  },
  [WeatherCode.SLIGHT_SNOW_SHOWER]: {
    icon: 'wi wi-wmo4680-84',
    name: 'Slight snow shower',
  },
  [WeatherCode.HEAVY_SNOW_SHOWER]: {
    icon: 'wi wi-wmo4680-85',
    name: 'Heavy snow shower',
  },
  [WeatherCode.SLIGHT_THUNDERSTORM]: {
    icon: 'wi wi-wmo4680-86',
    name: 'Slight thunderstorm',
  },
  [WeatherCode.THUNDERSTORM]: {
    icon: 'wi wi-wmo4680-95',
    name: 'Thunderstorm',
  },
};
