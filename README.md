# VietMusic

VietMusic là ứng dụng nghe nhạc Việt full-stack, gồm giao diện React/Vite và REST API Spring Boot. Ứng dụng hỗ trợ nghe nhạc, xem chi tiết bài hát, tìm kiếm, quản lý playlist cá nhân, yêu thích bài hát, lịch sử nghe nhạc, đăng nhập JWT/Google và trang quản trị nội dung.

## Tính năng chính

- Nghe nhạc với player cố định, chuyển bài, tua tiến trình, chỉnh âm lượng, shuffle và repeat.
- Danh sách bài hát, album, nghệ sĩ, thể loại và trang chi tiết bài hát.
- Tìm kiếm bài hát theo tên, ca sĩ hoặc album.
- Đăng ký, đăng nhập, đăng nhập Google và xác thực JWT.
- Yêu thích bài hát, quản lý danh sách yêu thích.
- Tạo playlist cá nhân, thêm/xóa bài hát khỏi playlist.
- Lưu lịch sử nghe nhạc.
- Trang admin để quản lý bài hát, nghệ sĩ, album, thể loại và người dùng.
- Upload/lưu media qua local storage hoặc Cloudinary tùy cấu hình.
- Giao diện responsive cho desktop và mobile.

## Công nghệ sử dụng

**Frontend**

- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- React Hook Form + Zod
- Lucide React

**Backend**

- Java 17
- Spring Boot 3.3
- Spring Security
- Spring Data JPA
- MySQL
- JWT
- Google API Client
- Cloudinary SDK
- Maven

## Cấu trúc dự án

```text
MusicApp/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/       # Controllers, services, repositories, entities
│   ├── src/main/resources/  # application.properties, seed data
│   └── pom.xml
├── frontend/                # React/Vite client
│   ├── src/api/             # Axios clients
│   ├── src/components/      # UI components
│   ├── src/features/        # Redux slices
│   ├── src/pages/           # Public, user, auth, admin pages
│   └── package.json
├── audio/                   # Local media files, nếu dùng local upload
├── .env.example             # Biến môi trường mẫu
└── aiven_backup.sql         # SQL backup mẫu
```

## Yêu cầu môi trường

- Node.js 20+ hoặc bản tương thích với Vite 8
- npm
- Java 17
- MySQL 8 hoặc MariaDB tương thích
- Maven wrapper đã có sẵn trong `backend/`

## Cài đặt

Clone repo và cài dependencies frontend:

```bash
git clone <repo-url>
cd MusicApp
cd frontend
npm install
```

Tạo database:

```sql
CREATE DATABASE music_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Tạo file cấu hình môi trường từ file mẫu:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Trên Windows PowerShell:

```powershell
Copy-Item .env.example .env
Copy-Item frontend/.env.example frontend/.env
```

## Biến môi trường

Các biến chính trong `.env`:

```env
DB_URL=jdbc:mysql://localhost:3306/music_app
DB_USERNAME=root
DB_PASSWORD=
JWT_SECRET=replace_with_a_random_secret_at_least_32_chars_long
JWT_EXPIRATION=86400000
SERVER_PORT=8080
UPLOAD_DIR=uploads
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174
CLOUDINARY_ENABLED=false
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
APP_SEED_ENABLED=true
APP_SEED_ADMIN_PASSWORD=change_me_for_local_admin
APP_SEED_USER_PASSWORD=change_me_for_local_users
```

Các biến frontend trong `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=
```

## Chạy local

Chạy backend:

```bash
cd backend
./mvnw spring-boot:run
```

Trên Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend mặc định chạy tại:

```text
http://localhost:8080/api
```

Chạy frontend:

```bash
cd frontend
npm run dev
```

Frontend mặc định chạy tại:

```text
http://localhost:5173
```

## Tài khoản seed

Khi `APP_SEED_ENABLED=true`, backend sẽ tạo tài khoản mẫu:

- Admin: `quochuy@gmail.com`
- User: `user@gmail.com`

Mật khẩu lấy từ:

- `APP_SEED_ADMIN_PASSWORD`
- `APP_SEED_USER_PASSWORD`

## Scripts hữu ích

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Backend:

```bash
./mvnw test
./mvnw spring-boot:run
./mvnw clean package
```

Trên Windows dùng `.\mvnw.cmd` thay cho `./mvnw`.

## API chính

- `POST /api/auth/login` - đăng nhập
- `POST /api/auth/register` - đăng ký
- `GET /api/songs` - danh sách bài hát
- `GET /api/songs/{id}` - chi tiết bài hát
- `GET /api/albums` - danh sách album
- `GET /api/artists` - danh sách nghệ sĩ
- `GET /api/genres` - danh sách thể loại
- `GET /api/playlists` - playlist cá nhân
- `POST /api/playlists` - tạo playlist
- `POST /api/playlists/{playlistId}/songs/{songId}` - thêm bài hát vào playlist
- `GET /api/favorites` - danh sách yêu thích
- `POST /api/favorites/{songId}` - thêm bài hát vào yêu thích
- `DELETE /api/favorites/{songId}` - bỏ yêu thích
- `POST /api/history/{songId}` - lưu lịch sử nghe

Các API admin nằm dưới `/api/admin/**` và yêu cầu tài khoản có role `ADMIN`.

## Kiểm tra trước khi deploy

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
./mvnw test
```

## Ghi chú deploy

- Frontend có thể deploy lên Vercel hoặc các nền tảng static hosting hỗ trợ Vite.
- Backend cần môi trường chạy Java 17 và database MySQL.
- Cấu hình `VITE_API_BASE_URL` trỏ về URL backend production.
- Cấu hình `CORS_ALLOWED_ORIGINS` chứa domain frontend production.
- Không commit file `.env` thật hoặc secret thật lên Git.
