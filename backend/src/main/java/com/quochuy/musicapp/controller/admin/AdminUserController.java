package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin/users") @RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;
    @GetMapping public ApiResponse<Page<UserResponse>> list(@RequestParam(required = false) String keyword, Pageable pageable) { return ApiResponse.ok(adminUserService.list(keyword, pageable)); }
    @GetMapping("/{id}") public ApiResponse<UserResponse> get(@PathVariable Long id) { return ApiResponse.ok(adminUserService.get(id)); }
    @PatchMapping("/{id}/lock") public ApiResponse<UserResponse> lock(@PathVariable Long id) { return ApiResponse.ok(adminUserService.lock(id)); }
    @PatchMapping("/{id}/unlock") public ApiResponse<UserResponse> unlock(@PathVariable Long id) { return ApiResponse.ok(adminUserService.unlock(id)); }
}
