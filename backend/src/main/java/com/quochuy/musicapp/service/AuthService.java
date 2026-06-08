package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.*;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.entity.User;
import com.quochuy.musicapp.enums.*;
import com.quochuy.musicapp.exception.BadRequestException;
import com.quochuy.musicapp.mapper.UserMapper;
import com.quochuy.musicapp.repository.UserRepository;
import com.quochuy.musicapp.security.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CurrentUserService currentUserService;
    @Value("${google.client-id}")
    private String googleClientId;

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

    public AuthResponse googleLogin(GoogleLoginRequest request) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new BadRequestException("Google login is not configured");
        }

        GoogleIdToken.Payload payload = verifyGoogleIdToken(request.getIdToken());
        String email = payload.getEmail();
        if (email == null || email.isBlank()) {
            throw new BadRequestException("Google account email is required");
        }
        if (!Boolean.TRUE.equals(payload.getEmailVerified())) {
            throw new BadRequestException("Google email is not verified");
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> userRepository.save(User.builder()
                .fullName((String) payload.getOrDefault("name", email))
                .email(email)
                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                .avatarUrl((String) payload.get("picture"))
                .role(Role.USER)
                .status(UserStatus.ACTIVE)
                .build()));

        if (user.getStatus() == UserStatus.LOCKED) {
            throw new BadRequestException("Account is locked");
        }

        CustomUserDetails details = new CustomUserDetails(user);
        return AuthResponse.builder().token(jwtService.generateToken(details)).user(UserMapper.toResponse(user)).build();
    }

    private GoogleIdToken.Payload verifyGoogleIdToken(String idToken) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
            GoogleIdToken token = verifier.verify(idToken);
            if (token == null) {
                throw new BadRequestException("Invalid Google token");
            }
            return token.getPayload();
        } catch (BadRequestException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new BadRequestException("Unable to verify Google token");
        }
    }

    public UserResponse me() {
        return UserMapper.toResponse(currentUserService.get());
    }
}
