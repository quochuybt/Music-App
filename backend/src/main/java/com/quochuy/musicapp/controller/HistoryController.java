package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/history") @RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;
    @GetMapping public ApiResponse<List<SongResponse>> mine() { return ApiResponse.ok(historyService.mine()); }
    @PostMapping("/{songId}") public ApiResponse<SongResponse> save(@PathVariable Long songId) { return ApiResponse.ok(historyService.savePlay(songId)); }
    @DeleteMapping public ApiResponse<Void> clear() { historyService.clear(); return ApiResponse.message("History cleared", null); }
}
