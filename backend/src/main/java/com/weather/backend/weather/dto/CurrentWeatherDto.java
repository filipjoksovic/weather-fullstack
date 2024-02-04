package com.weather.backend.weather.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CurrentWeatherDto {

    @JsonProperty("longitude")
    private float longitude;
    @JsonProperty("latitude")
    private float latitude;
    @JsonProperty("elevation")
    private float elevation;
    @JsonProperty("generationtime_ms")
    private float generationtime_ms;
    @JsonProperty("hourly")
    private Object hourly;
    @JsonProperty("hourly_units")
    private Object hourlyUnits;
    @JsonProperty("daily_units")
    private Object dailyUnits;
    @JsonProperty("daily")
    private Object daily;
    @JsonProperty("utc_offset_seconds")
    private int utc_offset_seconds;
    @JsonProperty("timezone")
    private String timezone;
    @JsonProperty("timezone_abbreviation")
    private String timezone_abbreviation;
    @JsonProperty("current")
    private Object current;
    @JsonProperty("current_units")
    private Object currentUnits;
}
