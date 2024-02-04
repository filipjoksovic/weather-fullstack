package com.weather.backend.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.external-api")
@Getter
@Setter
@RequiredArgsConstructor
public class ExternalApiProperties {
    private String openMeteoCurrentBaseUrl = "https://api.open-meteo.com";
    private String openMeteoForecastBaseUrl = "https://api.open-meteo.com";
    private String openMeteoLocationBaseUrl = "https://geocoding-api.open-meteo.com";
    private String nominatimLocationBaseUrl = "https://nominatim.openstreetmap.org";

}
