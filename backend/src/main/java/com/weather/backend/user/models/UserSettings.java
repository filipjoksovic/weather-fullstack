package com.weather.backend.user.models;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserSettings {
    private String timeFormat;
    private String dateFormat;

    public UserSettings(String timeFormat, String dateFormat) {
        this.timeFormat = timeFormat;
        this.dateFormat = dateFormat;
    }
}
