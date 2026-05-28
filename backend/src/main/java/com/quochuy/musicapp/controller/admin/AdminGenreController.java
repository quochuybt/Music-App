package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.request.GenreRequest;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.service.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin/genres") @RequiredArgsConstructor
public class AdminGenreController {
    private final GenreService genreService;
    @GetMapping public ApiResponse<Page<GenreResponse>> list(Pageable pageable) { return ApiResponse.ok(genreService.adminList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<GenreResponse> get(@PathVariable Long id) { return ApiResponse.ok(genreService.getAdmin(id)); }
    @PostMapping public ApiResponse<GenreResponse> create(@Valid @RequestBody GenreRequest request) { return ApiResponse.ok(genreService.create(request)); }
    @PutMapping("/{id}") public ApiResponse<GenreResponse> update(@PathVariable Long id, @Valid @RequestBody GenreRequest request) { return ApiResponse.ok(genreService.update(id, request)); }
    @DeleteMapping("/{id}") public ApiResponse<Void> delete(@PathVariable Long id) { genreService.delete(id); return ApiResponse.message("Deleted", null); }
    @PatchMapping("/{id}/status") public ApiResponse<GenreResponse> status(@PathVariable Long id, @RequestParam CommonStatus status) { return ApiResponse.ok(genreService.updateStatus(id, status)); }
}
