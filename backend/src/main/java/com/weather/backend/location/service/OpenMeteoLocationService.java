package com.weather.backend.location.service;

import com.weather.backend.location.dto.OpenMeteoLocationDto;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface OpenMeteoLocationService {

    @GET("/v1/search")
    Call<OpenMeteoLocationDto> searchLocation(@Query("name") String name,
                                              @Query("count") String count,
                                              @Query("language") String language,
                                              @Query("format") String format);
}
