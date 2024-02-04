package com.weather.backend.weather.service;

import com.weather.backend.weather.dto.CurrentWeatherDto;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface CurrentWeatherService {

    @GET("/v1/forecast")
    Call<CurrentWeatherDto> currentWeather(@Query("longitude") String longitude,
                                           @Query("latitude") String latitude,
                                           @Query("current") String currentWeatherParams,
                                           @Query("temperature_unit") String temperatureUnit,
                                           @Query("wind_speed_unit") String windSpeedUnit,
                                           @Query("precipitation_unit") String precipitationUnit);

    @GET("/v1/forecast")
    Call<CurrentWeatherDto> dailyWeather(@Query("longitude") String longitude,
                                         @Query("latitude") String latitude,
                                         @Query("daily") String dailyWeatherParams,
                                         @Query("past_days") String pastDays,
                                         @Query("temperature_unit") String temperatureUnit,
                                         @Query("wind_speed_unit") String windSpeedUnit,
                                         @Query("precipitation_unit") String precipitationUnit);

    @GET("/v1/forecast")
    Call<CurrentWeatherDto> hourlyWeather(@Query("longitude") String longitude,
                                          @Query("latitude") String latitude,
                                          @Query("hourly") String hourlyWeatherParams,
                                          @Query("temperature_unit") String temperatureUnit,
                                          @Query("wind_speed_unit") String windSpeedUnit,
                                          @Query("precipitation_unit") String precipitationUnit,
                                          @Query("start_date") String startDate,
                                          @Query("end_date") String endDate);


}
