package com.quochuy.musicapp.service;

import com.cloudinary.Cloudinary;
import com.quochuy.musicapp.dto.response.UploadResponse;
import com.quochuy.musicapp.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryStorageService {
    private final Cloudinary cloudinary;

    @Value("${app.cloudinary.enabled:false}")
    private boolean enabled;
    @Value("${app.cloudinary.cloud-name:}")
    private String cloudName;
    @Value("${app.cloudinary.api-key:}")
    private String apiKey;
    @Value("${app.cloudinary.api-secret:}")
    private String apiSecret;
    @Value("${app.cloudinary.folder:vietmusic}")
    private String folder;

    public boolean isConfigured() {
        return enabled && !cloudName.isBlank() && !apiKey.isBlank() && !apiSecret.isBlank();
    }

    public UploadResponse upload(MultipartFile file, String type, String extension) {
        String resourceType = "audio".equals(type) ? "video" : "image";
        String publicId = folder + "/" + type + "/" + UUID.randomUUID();
        try {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "resource_type", resourceType,
                    "public_id", publicId,
                    "overwrite", false
            ));
            String secureUrl = String.valueOf(result.get("secure_url"));
            Object resultPublicId = result.get("public_id");
            String fileName = String.valueOf(resultPublicId == null ? publicId : resultPublicId) + extension;
            return UploadResponse.builder()
                    .url(secureUrl)
                    .fileName(fileName)
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .build();
        } catch (Exception ex) {
            log.error("Cloudinary upload failed for type={}, contentType={}, size={}", type, file.getContentType(), file.getSize(), ex);
            throw new BadRequestException("Khong upload duoc file len Cloudinary: " + safeMessage(ex));
        }
    }

    private String safeMessage(Exception ex) {
        String message = ex.getMessage();
        if (message == null || message.isBlank()) return "Cloudinary rejected the upload";
        return message.replace(apiSecret, "[hidden]");
    }
}
