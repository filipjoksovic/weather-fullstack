export type ForecastRequest = {
  temperature_unit: string;
  wind_speed_unit: string;
  precipitation_unit: string;
  timeformat: string;
  timezone: string;
  past_days: string;
  forecast_days: string;
  forecast_hours: number;
  forecast_minutely_15: number;
  past_hours: number;
  past_minutely_15: number;
  start_date: string;
  end_date: string;
  start_hour: number;
  end_hour: number;
  start_minutely_15: number;
  end_minutely_15: number;
};
