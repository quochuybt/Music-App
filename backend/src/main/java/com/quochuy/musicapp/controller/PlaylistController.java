package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.request.PlaylistRequest;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.PlaylistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/playlists") @RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService playlistService;
    @GetMapping public ApiResponse<List<PlaylistResponse>> mine() { return ApiResponse.ok(playlistService.mine()); }
    @PostMapping public ApiResponse<PlaylistResponse> create(@Valid @RequestBody PlaylistRequest request) { return ApiResponse.ok(playlistService.create(request)); }
    @GetMapping("/{id}") public ApiResponse<PlaylistResponse> get(@PathVariable Long id) { return ApiResponse.ok(playlistService.get(id)); }
    @PutMapping("/{id}") public ApiResponse<PlaylistResponse> update(@PathVariable Long id, @Valid @RequestBody PlaylistRequest request) { return ApiResponse.ok(playlistService.update(id, request)); }
    @DeleteMapping("/{id}") public ApiResponse<Void> delete(@PathVariable Long id) { playlistService.delete(id); return ApiResponse.message("Deleted", null); }
    @PostMapping("/{playlistId}/songs/{songId}") public ApiResponse<PlaylistResponse> addSong(@PathVariable Long playlistId, @PathVariable Long songId) { return ApiResponse.ok(playlistService.addSong(playlistId, songId)); }
    @DeleteMapping("/{playlistId}/songs/{songId}") public ApiResponse<PlaylistResponse> removeSong(@PathVariable Long playlistId, @PathVariable Long songId) { return ApiResponse.ok(playlistService.removeSong(playlistId, songId)); }
}
