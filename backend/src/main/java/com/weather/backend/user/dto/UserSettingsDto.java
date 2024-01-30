package com.weather.backend.user.dto;

import com.weather.backend.user.models.UserSettings;
import lombok.Builder;

@Builder
public record UserSettingsDto(String id, String dateFormat,
                              String timeFormat) {

    public static UserSettingsDto to(String userId, UserSettings userSettings) {
        return UserSettingsDto.builder()
                              .id(userId)
                              .timeFormat(userSettings.getTimeFormat()
                                         )
                              .dateFormat(userSettings.getDateFormat()
                                         ).build();
    }

    public static UserSettingsDto to(UserSettings userSettings) {
        return UserSettingsDto.builder()
                              .timeFormat(userSettings.getTimeFormat()
                                         )
                              .dateFormat(userSettings.getDateFormat()
                                         ).build();
    }
}
