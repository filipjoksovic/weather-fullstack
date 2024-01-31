package com.weather.backend.user.dto;

public record UpdateUserUnitSettingsRequest(String speed, String temperature,
                                            String height, String percentage,
                                            String direction, String pressure) {

}
