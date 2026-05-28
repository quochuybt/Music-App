import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Vui lòng nhập họ tên"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const songSchema = z.object({
  title: z.string().min(1, "Tên bài hát bắt buộc"),
  artistId: z.coerce.number().min(1, "Ca sĩ bắt buộc"),
  albumId: z.union([z.coerce.number(), z.literal("")]).optional(),
  genreId: z.coerce.number().min(1, "Thể loại bắt buộc"),
  imageUrl: z.string().min(1, "Ảnh bắt buộc"),
  audioUrl: z.string().optional(),
  duration: z.string().min(1, "Thời lượng bắt buộc"),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const artistSchema = z.object({
  name: z.string().min(1, "Tên ca sĩ bắt buộc"),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const albumSchema = z.object({
  title: z.string().min(1, "Tên album bắt buộc"),
  imageUrl: z.string().optional(),
  artistId: z.union([z.coerce.number(), z.literal("")]).optional(),
  releaseYear: z.union([z.coerce.number(), z.literal("")]).optional(),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const genreSchema = z.object({
  name: z.string().min(1, "Tên thể loại bắt buộc"),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const playlistSchema = z.object({
  name: z.string().min(1, "Tên playlist bắt buộc"),
  description: z.string().optional(),
});
