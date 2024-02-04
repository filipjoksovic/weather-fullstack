package com.weather.backend.user.models;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserUnitSettings {
    private String speed;
    private String temperature;
    private String height;
    private String percentage;
    private String direction;
    private String pressure;

    public UserUnitSettings(String speed, String temperature, String height, String percentage, String direction, String pressure) {
        this.speed = speed;
        this.temperature = temperature;
        this.height = height;
        this.percentage = percentage;
        this.direction = direction;
        this.pressure = pressure;
    }
}
