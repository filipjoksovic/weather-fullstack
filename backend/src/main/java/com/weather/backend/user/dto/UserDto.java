package com.weather.backend.user.dto;

import com.weather.backend.user.models.User;
import lombok.Builder;

@Builder
public record UserDto(String id, String firstName, String lastName,
                      String email, UserSettingsDto userSettings,
                      String token) {
    public static UserDto to(User user) {
        return UserDto.builder()
                      .id(user.getId())
                      .firstName(user.getFirstName())
                      .lastName(user.getLastName())
                      .email(user.getEmail())
                      .userSettings(UserSettingsDto.to(user.getUserSettings()))
                      .build();

    }

    public static UserDto to(User user, String token) {
        return UserDto.builder()
                      .id(user.getId())
                      .firstName(user.getFirstName())
                      .lastName(user.getLastName())
                      .email(user.getEmail())
                      .userSettings(UserSettingsDto.to(user.getUserSettings()))
                      .token(token)
                      .build();
    }
}
