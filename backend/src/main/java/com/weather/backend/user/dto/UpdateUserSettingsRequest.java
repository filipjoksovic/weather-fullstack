package com.weather.backend.user.dto;

public record UpdateUserSettingsRequest(String dateFormat, String timeFormat) {
}
