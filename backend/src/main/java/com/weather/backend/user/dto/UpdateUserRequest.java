package com.weather.backend.user.dto;

public record UpdateUserRequest(String firstName, String lastName,
                                String email) {
}
