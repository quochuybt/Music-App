package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin/dashboard") @RequiredArgsConstructor
public class AdminDashboardController {
    private final AdminDashboardService adminDashboardService;
    @GetMapping("/statistics")
    public ApiResponse<DashboardStatsResponse> statistics() {
        return ApiResponse.ok(adminDashboardService.stats());
    }
}
