package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.UploadResponse;
import com.quochuy.musicapp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    @Value("${app.upload-dir:uploads}")
    private String uploadDir;
    @Value("${app.upload.max-audio-size:20971520}")
    private long maxAudioSize;
    @Value("${app.upload.max-image-size:5242880}")
    private long maxImageSize;

    private static final Set<String> AUDIO_TYPES = Set.of("audio/mpeg", "audio/mp4", "audio/mp4a-latm", "audio/x-m4a", "audio/aac", "audio/wav", "audio/ogg");
    private static final Set<String> IMAGE_TYPES = Set.of("image/jpeg", "image/png", "image/webp", "image/gif");
    private static final Set<String> AUDIO_EXTENSIONS = Set.of(".mp3", ".m4a", ".mp4", ".aac", ".wav", ".ogg");
    private static final Set<String> IMAGE_EXTENSIONS = Set.of(".jpg", ".jpeg", ".png", ".webp", ".gif");
    private static final Map<String, Set<String>> EXTENSIONS_BY_TYPE = Map.of(
            "audio", AUDIO_EXTENSIONS,
            "image", IMAGE_EXTENSIONS
    );

    public UploadResponse store(MultipartFile file, String type) {
        if (!EXTENSIONS_BY_TYPE.containsKey(type)) throw new BadRequestException("Invalid upload type");
        if (file == null || file.isEmpty()) throw new BadRequestException("File khong duoc rong");

        String contentType = file.getContentType() == null ? "application/octet-stream" : file.getContentType();
        String extension = extension(file.getOriginalFilename());
        validateSize(file, type);
        validateContentType(contentType, type);
        validateExtension(extension, type);
        validateSignature(file, type);

        try {
            Path folder = Path.of(uploadDir, type).toAbsolutePath().normalize();
            Files.createDirectories(folder);
            String fileName = UUID.randomUUID() + extension;
            Path target = folder.resolve(fileName).normalize();
            if (!target.startsWith(folder)) throw new BadRequestException("Invalid file path");
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            String url = "/uploads/" + type + "/" + fileName;
            return UploadResponse.builder().url(url).fileName(fileName).contentType(contentType).size(file.getSize()).build();
        } catch (IOException ex) {
            throw new BadRequestException("Khong luu duoc file");
        }
    }

    private void validateSize(MultipartFile file, String type) {
        long maxSize = "audio".equals(type) ? maxAudioSize : maxImageSize;
        if (file.getSize() > maxSize) throw new BadRequestException("File is too large");
    }

    private void validateContentType(String contentType, String type) {
        if ("audio".equals(type) && !AUDIO_TYPES.contains(contentType)) throw new BadRequestException("File audio khong hop le");
        if ("image".equals(type) && !IMAGE_TYPES.contains(contentType)) throw new BadRequestException("File anh khong hop le");
    }

    private void validateExtension(String extension, String type) {
        if (extension.isBlank() || !EXTENSIONS_BY_TYPE.get(type).contains(extension)) {
            throw new BadRequestException("File extension khong hop le");
        }
    }

    private void validateSignature(MultipartFile file, String type) {
        try {
            byte[] header = file.getInputStream().readNBytes(16);
            boolean valid = "image".equals(type) ? hasImageSignature(header) : hasAudioSignature(header);
            if (!valid) throw new BadRequestException("File content khong hop le");
        } catch (IOException ex) {
            throw new BadRequestException("Khong doc duoc file");
        }
    }

    private boolean hasImageSignature(byte[] header) {
        return startsWith(header, 0xFF, 0xD8, 0xFF)
                || startsWith(header, 0x89, 0x50, 0x4E, 0x47)
                || startsWith(header, 0x52, 0x49, 0x46, 0x46) && startsWithAt(header, 8, 0x57, 0x45, 0x42, 0x50)
                || startsWith(header, 0x47, 0x49, 0x46, 0x38);
    }

    private boolean hasAudioSignature(byte[] header) {
        return startsWith(header, 0x49, 0x44, 0x33)
                || header.length >= 2 && unsigned(header[0]) == 0xFF && (unsigned(header[1]) & 0xE0) == 0xE0
                || startsWith(header, 0x52, 0x49, 0x46, 0x46) && startsWithAt(header, 8, 0x57, 0x41, 0x56, 0x45)
                || startsWith(header, 0x4F, 0x67, 0x67, 0x53)
                || startsWithAt(header, 4, 0x66, 0x74, 0x79, 0x70);
    }

    private boolean startsWith(byte[] bytes, int... expected) {
        return startsWithAt(bytes, 0, expected);
    }

    private boolean startsWithAt(byte[] bytes, int offset, int... expected) {
        if (bytes.length < offset + expected.length) return false;
        for (int i = 0; i < expected.length; i++) {
            if (unsigned(bytes[offset + i]) != expected[i]) return false;
        }
        return true;
    }

    private int unsigned(byte value) {
        return value & 0xFF;
    }

    private String extension(String originalName) {
        if (originalName == null || !originalName.contains(".")) return "";
        return originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
    }
}
