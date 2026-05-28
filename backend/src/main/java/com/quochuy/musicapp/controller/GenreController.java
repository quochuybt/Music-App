package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/genres") @RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;
    private final SongService songService;

    @GetMapping public ApiResponse<Page<GenreResponse>> list(Pageable pageable) { return ApiResponse.ok(genreService.publicList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<GenreResponse> get(@PathVariable Long id) { return ApiResponse.ok(genreService.getPublic(id)); }
    @GetMapping("/{id}/songs") public ApiResponse<Page<SongResponse>> songs(@PathVariable Long id, Pageable pageable) { return ApiResponse.ok(songService.byGenre(id, pageable)); }
}
