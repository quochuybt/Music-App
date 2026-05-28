package com.quochuy.musicapp.mapper;

import com.quochuy.musicapp.dto.response.UserResponse;
import com.quochuy.musicapp.entity.User;

public class UserMapper {
    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId()).fullName(user.getFullName()).email(user.getEmail())
                .role(user.getRole()).avatarUrl(user.getAvatarUrl()).status(user.getStatus())
                .build();
    }
}
