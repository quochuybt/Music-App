package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.request.AlbumRequest;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.service.AlbumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin/albums") @RequiredArgsConstructor
public class AdminAlbumController {
    private final AlbumService albumService;
    @GetMapping public ApiResponse<Page<AlbumResponse>> list(Pageable pageable) { return ApiResponse.ok(albumService.adminList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<AlbumResponse> get(@PathVariable Long id) { return ApiResponse.ok(albumService.getAdmin(id)); }
    @PostMapping public ApiResponse<AlbumResponse> create(@Valid @RequestBody AlbumRequest request) { return ApiResponse.ok(albumService.create(request)); }
    @PutMapping("/{id}") public ApiResponse<AlbumResponse> update(@PathVariable Long id, @Valid @RequestBody AlbumRequest request) { return ApiResponse.ok(albumService.update(id, request)); }
    @DeleteMapping("/{id}") public ApiResponse<Void> delete(@PathVariable Long id) { albumService.delete(id); return ApiResponse.message("Deleted", null); }
    @PatchMapping("/{id}/status") public ApiResponse<AlbumResponse> status(@PathVariable Long id, @RequestParam CommonStatus status) { return ApiResponse.ok(albumService.updateStatus(id, status)); }
}
