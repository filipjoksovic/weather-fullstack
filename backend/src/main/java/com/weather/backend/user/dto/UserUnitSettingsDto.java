package com.weather.backend.user.dto;


import com.weather.backend.user.models.UserUnitSettings;
import lombok.Builder;

@Builder
public record UserUnitSettingsDto(String id, String speed, String temperature,
                                  String height, String percentage,
                                  String direction, String pressure) {

    public static UserUnitSettingsDto to(UserUnitSettings userUnitSettings) {
        return UserUnitSettingsDto.builder()
                                  .speed(userUnitSettings.getSpeed())
                                  .temperature(userUnitSettings.getTemperature())
                                  .height(userUnitSettings.getHeight())
                                  .percentage(userUnitSettings.getPercentage())
                                  .direction(userUnitSettings.getDirection())
                                  .pressure(userUnitSettings.getPressure())
                                  .build();
    }

    public static UserUnitSettingsDto to(String id, UserUnitSettings userUnitSettings) {
        return UserUnitSettingsDto.builder()
                                  .id(id)
                                  .speed(userUnitSettings.getSpeed())
                                  .temperature(userUnitSettings.getTemperature())
                                  .height(userUnitSettings.getHeight())
                                  .percentage(userUnitSettings.getPercentage())
                                  .direction(userUnitSettings.getDirection())
                                  .pressure(userUnitSettings.getPressure())
                                  .build();
    }

}
