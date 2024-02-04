package com.weather.backend.location.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OpenMeteoLocationResult {
    private String id;
    private String name;
    private String latitude;
    private String longitude;
    private String elevation;
    private String feature_code;
    private String country_code;
    private String admin1_id;
    private String timezone;
    private String population;
    private String country_id;
    private String country;
    private String admin1;
}
