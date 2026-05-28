package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.request.ArtistRequest;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.service.ArtistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin/artists") @RequiredArgsConstructor
public class AdminArtistController {
    private final ArtistService artistService;
    @GetMapping public ApiResponse<Page<ArtistResponse>> list(Pageable pageable) { return ApiResponse.ok(artistService.adminList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<ArtistResponse> get(@PathVariable Long id) { return ApiResponse.ok(artistService.getAdmin(id)); }
    @PostMapping public ApiResponse<ArtistResponse> create(@Valid @RequestBody ArtistRequest request) { return ApiResponse.ok(artistService.create(request)); }
    @PutMapping("/{id}") public ApiResponse<ArtistResponse> update(@PathVariable Long id, @Valid @RequestBody ArtistRequest request) { return ApiResponse.ok(artistService.update(id, request)); }
    @DeleteMapping("/{id}") public ApiResponse<Void> delete(@PathVariable Long id) { artistService.delete(id); return ApiResponse.message("Deleted", null); }
    @PatchMapping("/{id}/status") public ApiResponse<ArtistResponse> status(@PathVariable Long id, @RequestParam CommonStatus status) { return ApiResponse.ok(artistService.updateStatus(id, status)); }
}
