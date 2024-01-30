package com.weather.backend.user.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSettings {
    private String timeFormat;
    private String dateFormat;
}
