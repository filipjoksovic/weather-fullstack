package com.weather.backend.weather.controllers;

import com.weather.backend.weather.dto.CurrentWeatherDto;
import com.weather.backend.weather.service.CurrentWeatherService;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import java.io.IOException;

@CrossOrigin
@Controller
@RequestMapping("/api/weather")
public class WeatherHttpController {


    @GetMapping("/current")
    public ResponseEntity<CurrentWeatherDto> getCurrentWeather(@RequestParam("longitude") String longitude,
                                                               @RequestParam("latitude") String latitude,
                                                               @RequestParam("current") String current,
                                                               @RequestParam("temperature_unit") String temperatureUnit,
                                                               @RequestParam("wind_speed_unit") String windSpeedUnit,
                                                               @RequestParam("precipitation_unit") String precipitationUnit) throws IOException {

        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.open-meteo.com")
                .client(client)
                .addConverterFactory(JacksonConverterFactory.create())
                .build();

        CurrentWeatherService service = retrofit.create(CurrentWeatherService.class);
        Call<CurrentWeatherDto> callSync = service.currentWeather(longitude, latitude, current, temperatureUnit, windSpeedUnit, precipitationUnit);
        return ResponseEntity.ok(callSync.execute().body());
    }

    @GetMapping("/daily")
    public ResponseEntity<CurrentWeatherDto> getDailyWeather(@RequestParam("longitude") String longitude,
                                                             @RequestParam("latitude") String latitude,
                                                             @RequestParam("daily") String daily,
                                                             @RequestParam("past_days") String pastDays,
                                                             @RequestParam("temperature_unit") String temperatureUnit,
                                                             @RequestParam("wind_speed_unit") String windSpeedUnit,
                                                             @RequestParam("precipitation_unit") String precipitationUnit) throws IOException {

        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.open-meteo.com")
                .client(client)
                .addConverterFactory(JacksonConverterFactory.create())
                .build();

        CurrentWeatherService service = retrofit.create(CurrentWeatherService.class);
        Call<CurrentWeatherDto> callSync = service.dailyWeather(longitude, latitude, daily, pastDays, temperatureUnit, windSpeedUnit, precipitationUnit);
        return ResponseEntity.ok(callSync.execute().body());
    }

    @GetMapping("/hourly")
    public ResponseEntity<CurrentWeatherDto> getHourlyWeather(@RequestParam("longitude") String longitude,
                                                              @RequestParam("latitude") String latitude,
                                                              @RequestParam("hourly") String hourly,
                                                              @RequestParam("start_date") String startDate,
                                                              @RequestParam("end_date") String endDate,
                                                              @RequestParam("temperature_unit") String temperatureUnit,
                                                              @RequestParam("wind_speed_unit") String windSpeedUnit,
                                                              @RequestParam("precipitation_unit") String precipitationUnit) throws IOException {

        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.open-meteo.com")
                .client(client)
                .addConverterFactory(JacksonConverterFactory.create())
                .build();

        CurrentWeatherService service = retrofit.create(CurrentWeatherService.class);
        Call<CurrentWeatherDto> callSync = service.hourlyWeather(longitude, latitude, hourly, temperatureUnit, windSpeedUnit, precipitationUnit, startDate, endDate);
        return ResponseEntity.ok(callSync.execute().body());
    }

}
