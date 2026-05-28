package com.quochuy.musicapp.service;

import com.quochuy.musicapp.entity.User;
import com.quochuy.musicapp.exception.UnauthorizedException;
import com.quochuy.musicapp.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {
    public User get() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails details)) {
            throw new UnauthorizedException("Unauthorized");
        }
        return details.getUser();
    }
}
