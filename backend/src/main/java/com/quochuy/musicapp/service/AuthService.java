package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.*;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.entity.User;
import com.quochuy.musicapp.enums.*;
import com.quochuy.musicapp.exception.BadRequestException;
import com.quochuy.musicapp.mapper.UserMapper;
import com.quochuy.musicapp.repository.UserRepository;
import com.quochuy.musicapp.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CurrentUserService currentUserService;

    public UserResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Confirm password does not match");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .status(UserStatus.ACTIVE)
                .build();
        return UserMapper.toResponse(userRepository.save(user));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        if (user.getStatus() == UserStatus.LOCKED) {
            throw new BadRequestException("Account is locked");
        }
        CustomUserDetails details = new CustomUserDetails(user);
        return AuthResponse.builder().token(jwtService.generateToken(details)).user(UserMapper.toResponse(user)).build();
    }

    public UserResponse me() {
        return UserMapper.toResponse(currentUserService.get());
    }
}
