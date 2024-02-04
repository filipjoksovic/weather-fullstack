package com.weather.backend.location.service;

import com.weather.backend.location.dto.NominatimLocationDto;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface NominatimLocationService {
    @GET("reverse.php")
    Call<NominatimLocationDto> searchLocation(@Query("lat") String lat,
                                              @Query("lon") String lon,
                                              @Query("format") String format);
}
