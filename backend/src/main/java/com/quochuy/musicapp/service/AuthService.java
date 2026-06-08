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

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
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

        GoogleProfile profile = request.getIdToken() != null && !request.getIdToken().isBlank()
                ? profileFromIdToken(request.getIdToken())
                : profileFromAccessToken(request.getAccessToken());
        String email = profile.email();
        if (email == null || email.isBlank()) {
            throw new BadRequestException("Google account email is required");
        }
        if (!profile.emailVerified()) {
            throw new BadRequestException("Google email is not verified");
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> userRepository.save(User.builder()
                .fullName(profile.name() != null && !profile.name().isBlank() ? profile.name() : email)
                .email(email)
                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                .avatarUrl(profile.picture())
                .role(Role.USER)
                .status(UserStatus.ACTIVE)
                .build()));

        if (user.getStatus() == UserStatus.LOCKED) {
            throw new BadRequestException("Account is locked");
        }

        CustomUserDetails details = new CustomUserDetails(user);
        return AuthResponse.builder().token(jwtService.generateToken(details)).user(UserMapper.toResponse(user)).build();
    }

    private GoogleProfile profileFromIdToken(String idToken) {
        GoogleIdToken.Payload payload = verifyGoogleIdToken(idToken);
        return new GoogleProfile(payload.getEmail(), Boolean.TRUE.equals(payload.getEmailVerified()),
                (String) payload.get("name"), (String) payload.get("picture"));
    }

    @SuppressWarnings("unchecked")
    private GoogleProfile profileFromAccessToken(String accessToken) {
        if (accessToken == null || accessToken.isBlank()) {
            throw new BadRequestException("Google token is required");
        }
        try {
            HttpClient client = HttpClient.newHttpClient();
            String encodedAccessToken = URLEncoder.encode(accessToken, StandardCharsets.UTF_8);
            HttpRequest tokenInfoRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://oauth2.googleapis.com/tokeninfo?access_token=" + encodedAccessToken))
                    .GET()
                    .build();
            HttpResponse<String> tokenInfoResponse = client.send(tokenInfoRequest, HttpResponse.BodyHandlers.ofString());
            if (tokenInfoResponse.statusCode() != 200) {
                throw new BadRequestException("Invalid Google token");
            }
            Map<String, Object> tokenInfo = new com.fasterxml.jackson.databind.ObjectMapper().readValue(tokenInfoResponse.body(), Map.class);
            if (!googleClientId.equals(tokenInfo.get("aud"))) {
                throw new BadRequestException("Invalid Google token audience");
            }

            HttpRequest userInfoRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://www.googleapis.com/oauth2/v3/userinfo"))
                    .header("Authorization", "Bearer " + accessToken)
                    .GET()
                    .build();
            HttpResponse<String> userInfoResponse = client.send(userInfoRequest, HttpResponse.BodyHandlers.ofString());
            if (userInfoResponse.statusCode() != 200) {
                throw new BadRequestException("Unable to read Google profile");
            }
            Map<String, Object> userInfo = new com.fasterxml.jackson.databind.ObjectMapper().readValue(userInfoResponse.body(), Map.class);
            boolean verified = Boolean.TRUE.equals(userInfo.get("email_verified")) || "true".equals(String.valueOf(userInfo.get("email_verified")));
            return new GoogleProfile((String) userInfo.get("email"), verified, (String) userInfo.get("name"), (String) userInfo.get("picture"));
        } catch (BadRequestException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new BadRequestException("Unable to verify Google token");
        }
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

    private record GoogleProfile(String email, boolean emailVerified, String name, String picture) {}

    public UserResponse me() {
        return UserMapper.toResponse(currentUserService.get());
    }
}
