package com.weather.backend.location.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@RequiredArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {
    @JsonProperty("amenity")
    private String amenity;
    @JsonProperty("house_number")
    private String house_number;
    @JsonProperty("road")
    private String road;
    @JsonProperty("quarter")
    private String quarter;
    @JsonProperty("suburb")
    private String suburb;
    @JsonProperty("city")
    private String city;
    @JsonProperty("postcode")
    private int postcode;
    @JsonProperty("country")
    private String country;
    @JsonProperty("country_code")
    private String country_code;

}
