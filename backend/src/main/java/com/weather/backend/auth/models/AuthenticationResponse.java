package com.weather.backend.auth.models;

public record AuthenticationResponse(String id, String email, String firstName
        , String lastName, String token
) {
}
