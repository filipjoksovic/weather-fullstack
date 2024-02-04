package com.weather.backend.user.dto;

import com.weather.backend.user.models.User;
import com.weather.backend.user.models.UserSettings;
import com.weather.backend.user.models.UserUnitSettings;
import lombok.Builder;

@Builder
public record UserDto(String id, String firstName, String lastName,
                      String email, UserSettingsDto userSettings,
                      UserUnitSettingsDto unitSettings,
                      String token) {
    public static UserDto to(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .unitSettings(UserUnitSettingsDto.to(user.getUserUnitSettings()))
                .userSettings(UserSettingsDto.to(user.getUserSettings()))
                .build();

    }

    public static UserDto to(User user, String token) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .unitSettings(UserUnitSettingsDto.to(user.getUserUnitSettings()))
                .userSettings(UserSettingsDto.to(user.getUserSettings()))
                .token(token)
                .build();
    }

    public static UserUnitSettings defaultUnitSettings() {
        return UserUnitSettings.builder()
                .temperature("°C")
                .speed("km/h")
                .pressure("hPa")
                .height("mm")
                .direction("°")
                .percentage("%")
                .build();
    }

    public static UserSettings defaultSettings() {
        return UserSettings.builder()
                .dateFormat("LONG")
                .timeFormat("LONG")
                .build();
    }
}
