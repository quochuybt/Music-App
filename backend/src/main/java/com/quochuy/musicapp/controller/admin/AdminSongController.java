package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.request.SongRequest;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.service.SongService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin/songs") @RequiredArgsConstructor
public class AdminSongController {
    private final SongService songService;
    @GetMapping public ApiResponse<Page<SongResponse>> list(Pageable pageable) { return ApiResponse.ok(songService.adminList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<SongResponse> get(@PathVariable Long id) { return ApiResponse.ok(songService.getAdmin(id)); }
    @PostMapping public ApiResponse<SongResponse> create(@Valid @RequestBody SongRequest request) { return ApiResponse.ok(songService.create(request)); }
    @PutMapping("/{id}") public ApiResponse<SongResponse> update(@PathVariable Long id, @Valid @RequestBody SongRequest request) { return ApiResponse.ok(songService.update(id, request)); }
    @DeleteMapping("/{id}") public ApiResponse<Void> delete(@PathVariable Long id) { songService.delete(id); return ApiResponse.message("Deleted", null); }
    @PatchMapping("/{id}/status") public ApiResponse<SongResponse> status(@PathVariable Long id, @RequestParam CommonStatus status) { return ApiResponse.ok(songService.updateStatus(id, status)); }
}
