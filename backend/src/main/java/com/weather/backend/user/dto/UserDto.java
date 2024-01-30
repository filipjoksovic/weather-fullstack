package com.weather.backend.user.dto;

import com.weather.backend.user.models.User;

public record UserDto(String id, String firstName, String lastName,
                      String email) {
    public static UserDto to(User user) {
        return new UserDto(user.getId(), user.getFirstName(),
                           user.getLastName(), user.getEmail());

    }
}
