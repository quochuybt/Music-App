package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/favorites") @RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    @GetMapping public ApiResponse<List<SongResponse>> mine() { return ApiResponse.ok(favoriteService.mine()); }
    @PostMapping("/{songId}") public ApiResponse<SongResponse> add(@PathVariable Long songId) { return ApiResponse.ok(favoriteService.add(songId)); }
    @DeleteMapping("/{songId}") public ApiResponse<Void> remove(@PathVariable Long songId) { favoriteService.remove(songId); return ApiResponse.message("Removed", null); }
    @GetMapping("/check/{songId}") public ApiResponse<Boolean> check(@PathVariable Long songId) { return ApiResponse.ok(favoriteService.check(songId)); }
}
