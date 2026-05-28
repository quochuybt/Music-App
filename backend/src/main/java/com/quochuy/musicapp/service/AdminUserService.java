package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.UserResponse;
import com.quochuy.musicapp.entity.User;
import com.quochuy.musicapp.enums.UserStatus;
import com.quochuy.musicapp.exception.*;
import com.quochuy.musicapp.mapper.UserMapper;
import com.quochuy.musicapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;

    public Page<UserResponse> list(String keyword, Pageable pageable) {
        if (keyword == null || keyword.isBlank()) return userRepository.findAll(pageable).map(UserMapper::toResponse);
        return userRepository.findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCase(keyword, keyword, pageable).map(UserMapper::toResponse);
    }
    public UserResponse get(Long id) { return UserMapper.toResponse(find(id)); }
    public UserResponse lock(Long id) {
        if (currentUserService.get().getId().equals(id)) throw new BadRequestException("Admin cannot lock current account");
        User user = find(id); user.setStatus(UserStatus.LOCKED); return UserMapper.toResponse(userRepository.save(user));
    }
    public UserResponse unlock(Long id) {
        User user = find(id); user.setStatus(UserStatus.ACTIVE); return UserMapper.toResponse(userRepository.save(user));
    }
    private User find(Long id) { return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found")); }
}
