package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.UploadResponse;
import com.quochuy.musicapp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    @Value("${app.upload-dir:uploads}")
    private String uploadDir;

    private static final Set<String> AUDIO_TYPES = Set.of("audio/mpeg", "audio/mp4", "audio/mp4a-latm", "audio/x-m4a", "audio/aac", "audio/wav", "audio/ogg");
    private static final Set<String> IMAGE_TYPES = Set.of("image/jpeg", "image/png", "image/webp", "image/gif");

    public UploadResponse store(MultipartFile file, String type) {
        if (file == null || file.isEmpty()) throw new BadRequestException("File không được rỗng");
        String contentType = file.getContentType() == null ? "application/octet-stream" : file.getContentType();
        if ("audio".equals(type) && !AUDIO_TYPES.contains(contentType)) throw new BadRequestException("File audio không hợp lệ");
        if ("image".equals(type) && !IMAGE_TYPES.contains(contentType)) throw new BadRequestException("File ảnh không hợp lệ");

        try {
            Path folder = Path.of(uploadDir, type).toAbsolutePath().normalize();
            Files.createDirectories(folder);
            String extension = extension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + extension;
            Path target = folder.resolve(fileName).normalize();
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            String url = "/uploads/" + type + "/" + fileName;
            return UploadResponse.builder().url(url).fileName(fileName).contentType(contentType).size(file.getSize()).build();
        } catch (IOException ex) {
            throw new BadRequestException("Không lưu được file");
        }
    }

    private String extension(String originalName) {
        if (originalName == null || !originalName.contains(".")) return "";
        return originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
    }
}
