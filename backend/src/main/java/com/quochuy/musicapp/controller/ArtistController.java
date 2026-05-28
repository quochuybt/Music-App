package com.quochuy.musicapp.controller;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/artists") @RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;
    private final SongService songService;
    private final AlbumService albumService;

    @GetMapping public ApiResponse<Page<ArtistResponse>> list(Pageable pageable) { return ApiResponse.ok(artistService.publicList(pageable)); }
    @GetMapping("/{id}") public ApiResponse<ArtistResponse> get(@PathVariable Long id) { return ApiResponse.ok(artistService.getPublic(id)); }
    @GetMapping("/{id}/songs") public ApiResponse<Page<SongResponse>> songs(@PathVariable Long id, Pageable pageable) { return ApiResponse.ok(songService.byArtist(id, pageable)); }
    @GetMapping("/{id}/albums") public ApiResponse<Page<AlbumResponse>> albums(@PathVariable Long id, Pageable pageable) { return ApiResponse.ok(albumService.byArtist(id, pageable)); }
}
