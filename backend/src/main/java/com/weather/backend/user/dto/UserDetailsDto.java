package com.weather.backend.user.dto;

public record UserDetailsDto(String id, String firstName, String lastName,
                             String email, String timeFormat,
                             String dateFormat) {
}
