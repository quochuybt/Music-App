package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/songs") @RequiredArgsConstructor
public class SongController {
    private final SongService songService;

    @GetMapping
    public ApiResponse<Page<SongResponse>> list(@RequestParam(required = false) Long genreId,
                                                @RequestParam(required = false) Long artistId,
                                                @RequestParam(required = false) Long albumId,
                                                @RequestParam(required = false) String keyword,
                                                Pageable pageable) {
        return ApiResponse.ok(songService.publicSearch(genreId, artistId, albumId, keyword, pageable));
    }

    @GetMapping("/search")
    public ApiResponse<Page<SongResponse>> search(@RequestParam(required = false) String keyword, Pageable pageable) {
        return ApiResponse.ok(songService.publicSearch(null, null, null, keyword, pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<SongResponse> get(@PathVariable Long id) {
        return ApiResponse.ok(songService.getPublic(id));
    }
}
