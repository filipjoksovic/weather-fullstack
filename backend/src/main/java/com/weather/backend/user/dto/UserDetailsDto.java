package com.weather.backend.user.dto;

import com.weather.backend.user.models.TimeFormat;

import java.text.DateFormat;

public record UserDetailsDto(String id, String firstName, String lastName,
                             String email, TimeFormat timeFormat,
                             DateFormat dateFormat) {
}
