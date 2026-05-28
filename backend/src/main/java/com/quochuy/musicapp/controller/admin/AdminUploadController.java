package com.quochuy.musicapp.controller.admin;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/uploads")
@RequiredArgsConstructor
public class AdminUploadController {
    private final FileStorageService fileStorageService;

    @PostMapping("/audio")
    public ApiResponse<UploadResponse> audio(@RequestParam("file") MultipartFile file) {
        return ApiResponse.ok(fileStorageService.store(file, "audio"));
    }

    @PostMapping("/image")
    public ApiResponse<UploadResponse> image(@RequestParam("file") MultipartFile file) {
        return ApiResponse.ok(fileStorageService.store(file, "image"));
    }
}
