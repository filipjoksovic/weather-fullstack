package com.weather.backend.user.controller;

import com.weather.backend.user.exception.UserNotFoundException;
import com.weather.backend.user.models.User;
import com.weather.backend.user.repository.UserRepository;
import com.weather.backend.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/users")
public class UserHttpController {

    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final UserService userService;

    public UserHttpController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAll() {
        return this.userService.getAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable String userId) throws UserNotFoundException {
        return this.userService.find(userId);
    }

    @PostMapping()
    public User createUser(@RequestBody User user) {
        return this.userService.create(user);
    }

    @PatchMapping
    public User updateUser(@RequestBody User user) {
        return this.userService.update(user);
    }
}
