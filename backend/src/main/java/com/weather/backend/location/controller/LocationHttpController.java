package com.weather.backend.location.controller;

import com.weather.backend.location.dto.NominatimLocationDto;
import com.weather.backend.location.dto.OpenMeteoLocationDto;
import com.weather.backend.location.service.NominatimLocationService;
import com.weather.backend.location.service.OpenMeteoLocationService;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import java.io.IOException;

@CrossOrigin
@Controller
@RequestMapping("/api/location")
public class LocationHttpController {

    OpenMeteoLocationService openMeteoLocationService;
    NominatimLocationService nominatimLocationService;

    public LocationHttpController() {
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient httpClient = new OkHttpClient();

        this.openMeteoLocationService = new Retrofit.Builder()
                .baseUrl("https://geocoding-api.open-meteo.com").addConverterFactory(JacksonConverterFactory.create()).client(httpClient).build().create(OpenMeteoLocationService.class);
        this.nominatimLocationService = new Retrofit.Builder().baseUrl("https://nominatim.openstreetmap.org").addConverterFactory(JacksonConverterFactory.create()).client(httpClient).build().create(NominatimLocationService.class);
    }

    @GetMapping("/search")
    public ResponseEntity<OpenMeteoLocationDto> searchLocation(@RequestParam("name") String name,
                                                               @RequestParam(value = "count", defaultValue = "10") int count,
                                                               @RequestParam(value = "language", defaultValue = "en") String language,
                                                               @RequestParam(value = "format", defaultValue = "json") String format) throws IOException {
        return ResponseEntity.ok(this.openMeteoLocationService.searchLocation(name, String.valueOf(count), language, format).execute().body());
    }

    @GetMapping("/reverse")
    public ResponseEntity<NominatimLocationDto> reverseLocation(@RequestParam("lat") String lat,
                                                                @RequestParam("lon") String lon,
                                                                @RequestParam(value = "format", defaultValue = "jsonv2") String format) throws IOException {
        return ResponseEntity.ok(this.nominatimLocationService.searchLocation(lat, lon, format).execute().body());
    }
}
