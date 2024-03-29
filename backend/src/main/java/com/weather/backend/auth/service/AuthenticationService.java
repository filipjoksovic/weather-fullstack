package com.weather.backend.auth.service;

import com.weather.backend.auth.models.LoginRequest;
import com.weather.backend.auth.models.RegisterRequest;
import com.weather.backend.security.JwtService;
import com.weather.backend.user.dto.UserDto;
import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;
import com.weather.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserDto register(RegisterRequest request) {
        LOG.info("Rgstr usr with {} {}", request.email(), request.password());
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setUserUnitSettings(UserDto.defaultUnitSettings());
        user.setUserSettings(UserDto.defaultSettings());
        user = userRepository.save(user);
        String token = jwtService.generateToken(user);
        LOG.info("Usr rgstrd {} {}", user.getId(), token);
        return UserDto.to(user, token);
    }

    public UserDto login(LoginRequest request) throws UserNotFoundException {
        LOG.info("Lgn attmpt for {} {}", request.email(), request.password());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(UserNotFoundException::new);
        String token = jwtService.generateToken(user);
        return UserDto.to(user, token);
    }
}
