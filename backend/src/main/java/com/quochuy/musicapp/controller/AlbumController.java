package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/albums") @RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;
    private final SongService songService;

    @GetMapping public ApiResponse<Page<AlbumResponse>> list(Pageable pageable) { return ApiResponse.ok(albumService.publicList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<AlbumResponse> get(@PathVariable Long id) { return ApiResponse.ok(albumService.getPublic(id)); }
    @GetMapping("/{id}/songs") public ApiResponse<Page<SongResponse>> songs(@PathVariable Long id, Pageable pageable) { return ApiResponse.ok(songService.byAlbum(id, pageable)); }
}
