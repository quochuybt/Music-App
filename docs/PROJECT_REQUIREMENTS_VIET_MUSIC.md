# PROJECT REQUIREMENTS - WEBSITE NGHE NHẠC VIỆT NAM FULL-STACK

## 1. Tổng quan dự án

Xây dựng một website nghe nhạc Việt Nam full-stack cho phép người dùng nghe nhạc giả lập, tìm kiếm bài hát, xem ca sĩ, album, tạo playlist, thêm bài hát yêu thích và xem lịch sử nghe nhạc.

Website có 2 nhóm người dùng chính:

- `USER`: người dùng bình thường, có thể nghe nhạc, tạo playlist, thêm yêu thích, xem lịch sử.
- `ADMIN`: quản trị viên, có thể quản lý bài hát, ca sĩ, album, thể loại và người dùng.

Tên website hiện tại đặt tạm là:

```txt
VietMusic
```

Tên này có thể thay đổi sau.

---

## 2. Công nghệ sử dụng

### Frontend

- nReact
- Vite
- Tailwid CSS
- React Router DOM
- Redux Toolkit
- Axios
- React Hook Form
- Yup hoặc Zod để validation form
- localStorage để lưu token, theme, player state cơ bản
- Lucide React hoặc React Icons để dùng icon

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT Authentication
- Lombok
- Validation
- MariaDB Driver

### Database

- MariaDB

### Authentication

- JWT Authentication
- Phân quyền theo role:
  - `USER`
  - `ADMIN`

---

## 3. Mức độ hoàn thiện mong muốn

Dự án cần làm theo hướng full-stack hoàn chỉnh, gồm:

- Frontend đầy đủ giao diện.
- Backend REST API đầy đủ.
- Database có quan hệ rõ ràng.
- Có đăng nhập, đăng ký.
- Có phân quyền USER / ADMIN.
- Có trang quản trị cho admin.
- Có chức năng playlist, yêu thích, lịch sử nghe nhạc.
- Có dark mode và light mode.
- Có responsive mobile.
- Code chuyên nghiệp, chia component rõ ràng.
- Có custom hook.
- Có Redux Toolkit.
- Có validation form.
- Có comment giải thích ở những phần quan trọng.

---

## 4. Lưu ý quan trọng về phát nhạc

Ở giai đoạn này **chưa cần phát nhạc thật**.

Admin chỉ cần nhập:

- Link ảnh bài hát
- Link audio

Frontend vẫn cần làm giao diện player đầy đủ:

- Play / Pause
- Next / Previous
- Progress bar
- Volume
- Hiển thị bài đang phát
- Hiển thị ảnh bài hát
- Hiển thị tên ca sĩ
- Hiển thị thời lượng bài hát

Tuy nhiên phần audio có thể giả lập bằng state. Khi người dùng bấm play:

- Cập nhật trạng thái bài đang phát trong Redux.
- Hiển thị player.
- Thêm bài hát vào lịch sử nghe nhạc nếu user đã đăng nhập.

Có thể chưa cần dùng thẻ `<audio>` thật ở giai đoạn đầu. Nếu có dùng thì vẫn phải code theo hướng dễ tắt/mở.

---

## 5. Chức năng người dùng USER

### 5.1. Đăng ký

Người dùng có thể đăng ký tài khoản với:

- Họ tên
- Email
- Mật khẩu
- Xác nhận mật khẩu

Validation:

- Họ tên không được rỗng.
- Email đúng định dạng.
- Mật khẩu ít nhất 6 ký tự.
- Xác nhận mật khẩu phải trùng mật khẩu.

Sau khi đăng ký thành công:

- Chuyển sang trang đăng nhập.
- Hiển thị thông báo thành công.

---

### 5.2. Đăng nhập

Người dùng đăng nhập bằng:

- Email
- Mật khẩu

Sau khi đăng nhập thành công:

- Lưu JWT token vào localStorage.
- Lưu thông tin user vào Redux.
- Điều hướng về trang chủ.
- Nếu role là `ADMIN`, cho phép truy cập trang admin.

---

### 5.3. Đăng xuất

Khi đăng xuất:

- Xóa token khỏi localStorage.
- Xóa user khỏi Redux.
- Reset player nếu cần.
- Điều hướng về trang đăng nhập hoặc trang chủ.

---

### 5.4. Xem trang chủ

Trang chủ cần có:

- Banner / hero section đẹp.
- Danh sách bài hát nổi bật.
- Danh sách album nổi bật.
- Danh sách ca sĩ nổi bật.
- Danh sách thể loại.
- Gợi ý playlist.
- Giao diện hiện đại, dễ nhìn, có hỗ trợ dark/light mode.

---

### 5.5. Xem danh sách bài hát

Người dùng có thể xem danh sách bài hát với thông tin:

- Ảnh bài hát
- Tên bài hát
- Ca sĩ
- Album
- Thể loại
- Thời lượng
- Nút play
- Nút thêm vào yêu thích
- Nút thêm vào playlist

Có phân trang hoặc load nhiều hơn.

---

### 5.6. Tìm kiếm bài hát

Người dùng có thể tìm kiếm theo:

- Tên bài hát
- Tên ca sĩ
- Tên album

Frontend có ô search trên header hoặc trang danh sách bài hát.

---

### 5.7. Lọc bài hát

Người dùng có thể lọc theo:

- Ca sĩ
- Thể loại
- Album

Có thể kết hợp search + filter.

---

### 5.8. Xem chi tiết bài hát

Trang chi tiết bài hát hiển thị:

- Ảnh bài hát lớn
- Tên bài hát
- Ca sĩ
- Album
- Thể loại
- Thời lượng
- Mô tả
- Nút play
- Nút yêu thích
- Nút thêm vào playlist

---

### 5.9. Trang ca sĩ

Người dùng có thể xem:

- Danh sách ca sĩ
- Chi tiết ca sĩ
- Tên ca sĩ
- Ảnh ca sĩ
- Tiểu sử ngắn
- Danh sách bài hát của ca sĩ
- Danh sách album của ca sĩ

---

### 5.10. Trang album

Người dùng có thể xem:

- Danh sách album
- Chi tiết album
- Ảnh album
- Tên album
- Ca sĩ
- Năm phát hành
- Mô tả
- Danh sách bài hát trong album

---

### 5.11. Playlist cá nhân

Người dùng đã đăng nhập có thể:

- Tạo playlist.
- Sửa tên playlist.
- Xóa playlist.
- Thêm bài hát vào playlist.
- Xóa bài hát khỏi playlist.
- Xem chi tiết playlist.

Thông tin playlist:

- ID
- Tên playlist
- Mô tả
- User sở hữu
- Danh sách bài hát
- Ngày tạo

---

### 5.12. Yêu thích

Người dùng đã đăng nhập có thể:

- Thêm bài hát vào danh sách yêu thích.
- Xóa bài hát khỏi danh sách yêu thích.
- Xem danh sách bài hát yêu thích.

---

### 5.13. Lịch sử nghe nhạc

Khi người dùng bấm play một bài hát:

- Nếu đã đăng nhập, lưu vào lịch sử nghe.
- Nếu bài hát đã có trong lịch sử, có thể cập nhật thời gian nghe mới nhất.

Trang lịch sử nghe hiển thị:

- Tên bài hát
- Ca sĩ
- Ảnh bài hát
- Thời gian nghe gần nhất
- Nút play lại

---

### 5.14. Dark mode / Light mode

Website có 2 theme:

- Light mode
- Dark mode

Yêu cầu:

- Có nút chuyển theme.
- Lưu theme vào localStorage.
- Khi reload trang vẫn giữ theme đã chọn.
- Dùng Tailwind CSS class `dark`.

---

## 6. Chức năng ADMIN

Admin có thể truy cập khu vực `/admin`.

Trang admin cần có layout riêng:

- Sidebar
- Topbar
- Content area
- Responsive

### 6.1. Dashboard admin

Hiển thị thống kê:

- Tổng số bài hát
- Tổng số ca sĩ
- Tổng số album
- Tổng số thể loại
- Tổng số user
- Tổng số playlist
- Bài hát được yêu thích nhiều nhất
- Bài hát được nghe nhiều nhất nếu có lịch sử

---

### 6.2. Quản lý bài hát

Admin có thể:

- Xem danh sách bài hát.
- Thêm bài hát.
- Sửa bài hát.
- Xóa bài hát.
- Tìm kiếm bài hát.
- Lọc bài hát theo ca sĩ, album, thể loại.

Form bài hát gồm:

- Tên bài hát
- Ca sĩ
- Album
- Thể loại
- Ảnh bài hát URL
- Audio URL
- Thời lượng
- Mô tả
- Trạng thái: ACTIVE / INACTIVE

Validation:

- Tên bài hát không được rỗng.
- Ca sĩ bắt buộc chọn.
- Thể loại bắt buộc chọn.
- Ảnh URL không được rỗng.
- Thời lượng không được rỗng.

---

### 6.3. Quản lý ca sĩ

Admin có thể:

- Xem danh sách ca sĩ.
- Thêm ca sĩ.
- Sửa ca sĩ.
- Xóa ca sĩ.

Form ca sĩ gồm:

- Tên ca sĩ
- Ảnh URL
- Tiểu sử
- Trạng thái

---

### 6.4. Quản lý album

Admin có thể:

- Xem danh sách album.
- Thêm album.
- Sửa album.
- Xóa album.

Form album gồm:

- Tên album
- Ảnh URL
- Ca sĩ
- Năm phát hành
- Mô tả
- Trạng thái

---

### 6.5. Quản lý thể loại

Admin có thể:

- Xem danh sách thể loại.
- Thêm thể loại.
- Sửa thể loại.
- Xóa thể loại.

Form thể loại gồm:

- Tên thể loại
- Mô tả
- Trạng thái

---

### 6.6. Quản lý người dùng

Admin có thể:

- Xem danh sách user.
- Tìm kiếm user.
- Khóa / mở khóa tài khoản.
- Xem role của user.

Không cần cho admin sửa mật khẩu user.

---

## 7. Cấu trúc route frontend đề xuất

```txt
/
├── /songs
├── /songs/:id
├── /artists
├── /artists/:id
├── /albums
├── /albums/:id
├── /genres/:id
├── /playlists
├── /playlists/:id
├── /favorites
├── /history
├── /login
├── /register
├── /profile
├── /admin
├── /admin/dashboard
├── /admin/songs
├── /admin/songs/create
├── /admin/songs/edit/:id
├── /admin/artists
├── /admin/albums
├── /admin/genres
├── /admin/users
└── /not-found
```

---

## 8. Layout frontend

### 8.1. User layout

Gồm:

- Header
- Sidebar hoặc navigation menu
- Main content
- Music player cố định dưới màn hình
- Footer nếu cần

Header có:

- Logo
- Search bar
- Nút đổi theme
- Nút login/register nếu chưa đăng nhập
- Avatar user nếu đã đăng nhập

Sidebar có:

- Trang chủ
- Bài hát
- Ca sĩ
- Album
- Playlist
- Yêu thích
- Lịch sử

Player nằm cố định bottom:

- Ảnh bài hát
- Tên bài hát
- Tên ca sĩ
- Play / Pause
- Next / Previous
- Progress bar
- Volume
- Nút yêu thích

---

### 8.2. Admin layout

Gồm:

- Admin sidebar
- Admin topbar
- Admin content

Sidebar admin có:

- Dashboard
- Quản lý bài hát
- Quản lý ca sĩ
- Quản lý album
- Quản lý thể loại
- Quản lý người dùng
- Quay về trang người dùng

---

## 9. Giao diện và theme

Thiết kế hiện đại, dễ nhìn, không cần giống hoàn toàn Spotify/Zing MP3 nhưng có cảm giác web nghe nhạc chuyên nghiệp.

### Màu sắc đề xuất

Light mode:

- Background: `#f8fafc`
- Card: `#ffffff`
- Text chính: `#0f172a`
- Text phụ: `#64748b`
- Primary: `#7c3aed`
- Secondary: `#06b6d4`

Dark mode:

- Background: `#020617`
- Card: `#0f172a`
- Text chính: `#f8fafc`
- Text phụ: `#94a3b8`
- Primary: `#a78bfa`
- Secondary: `#22d3ee`

Có thể dùng gradient nhẹ:

```txt
from-violet-500 to-cyan-400
```

---

## 10. Database schema đề xuất

### 10.1. Bảng `users`

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    avatar_url TEXT,
    status ENUM('ACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 10.2. Bảng `artists`

```sql
CREATE TABLE artists (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    image_url TEXT,
    bio TEXT,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 10.3. Bảng `genres`

```sql
CREATE TABLE genres (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 10.4. Bảng `albums`

```sql
CREATE TABLE albums (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    image_url TEXT,
    release_year INT,
    description TEXT,
    artist_id BIGINT,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_album_artist FOREIGN KEY (artist_id) REFERENCES artists(id)
);
```

---

### 10.5. Bảng `songs`

```sql
CREATE TABLE songs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    image_url TEXT,
    audio_url TEXT,
    duration VARCHAR(20),
    description TEXT,
    artist_id BIGINT NOT NULL,
    album_id BIGINT,
    genre_id BIGINT NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    play_count BIGINT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_song_artist FOREIGN KEY (artist_id) REFERENCES artists(id),
    CONSTRAINT fk_song_album FOREIGN KEY (album_id) REFERENCES albums(id),
    CONSTRAINT fk_song_genre FOREIGN KEY (genre_id) REFERENCES genres(id)
);
```

---

### 10.6. Bảng `playlists`

```sql
CREATE TABLE playlists (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    user_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_playlist_user FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### 10.7. Bảng `playlist_songs`

```sql
CREATE TABLE playlist_songs (
    playlist_id BIGINT NOT NULL,
    song_id BIGINT NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, song_id),
    CONSTRAINT fk_playlist_song_playlist FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    CONSTRAINT fk_playlist_song_song FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);
```

---

### 10.8. Bảng `favorites`

```sql
CREATE TABLE favorites (
    user_id BIGINT NOT NULL,
    song_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, song_id),
    CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_favorite_song FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);
```

---

### 10.9. Bảng `listening_history`

```sql
CREATE TABLE listening_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    song_id BIGINT NOT NULL,
    listened_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_history_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_history_song FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);
```

---

## 11. API endpoints đề xuất

Base URL:

```txt
http://localhost:8080/api
```

---

### 11.1. Auth API

```txt
POST /auth/register
POST /auth/login
GET  /auth/me
```

Request register:

```json
{
  "fullName": "Nguyen Van A",
  "email": "user@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

Request login:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Response login:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "fullName": "Nguyen Van A",
    "email": "user@gmail.com",
    "role": "USER"
  }
}
```

---

### 11.2. Song API

Public:

```txt
GET /songs
GET /songs/{id}
GET /songs/search?keyword=
GET /songs?genreId=&artistId=&albumId=
```

Admin:

```txt
POST   /admin/songs
PUT    /admin/songs/{id}
DELETE /admin/songs/{id}
PATCH  /admin/songs/{id}/status
```

---

### 11.3. Artist API

Public:

```txt
GET /artists
GET /artists/{id}
GET /artists/{id}/songs
GET /artists/{id}/albums
```

Admin:

```txt
POST   /admin/artists
PUT    /admin/artists/{id}
DELETE /admin/artists/{id}
PATCH  /admin/artists/{id}/status
```

---

### 11.4. Album API

Public:

```txt
GET /albums
GET /albums/{id}
GET /albums/{id}/songs
```

Admin:

```txt
POST   /admin/albums
PUT    /admin/albums/{id}
DELETE /admin/albums/{id}
PATCH  /admin/albums/{id}/status
```

---

### 11.5. Genre API

Public:

```txt
GET /genres
GET /genres/{id}
GET /genres/{id}/songs
```

Admin:

```txt
POST   /admin/genres
PUT    /admin/genres/{id}
DELETE /admin/genres/{id}
PATCH  /admin/genres/{id}/status
```

---

### 11.6. Playlist API

User:

```txt
GET    /playlists
POST   /playlists
GET    /playlists/{id}
PUT    /playlists/{id}
DELETE /playlists/{id}
POST   /playlists/{playlistId}/songs/{songId}
DELETE /playlists/{playlistId}/songs/{songId}
```

---

### 11.7. Favorite API

User:

```txt
GET    /favorites
POST   /favorites/{songId}
DELETE /favorites/{songId}
GET    /favorites/check/{songId}
```

---

### 11.8. Listening history API

User:

```txt
GET  /history
POST /history/{songId}
DELETE /history
```

---

### 11.9. Admin dashboard API

Admin:

```txt
GET /admin/dashboard/statistics
```

Response mẫu:

```json
{
  "totalSongs": 100,
  "totalArtists": 30,
  "totalAlbums": 20,
  "totalGenres": 10,
  "totalUsers": 200,
  "totalPlaylists": 80
}
```

---

### 11.10. Admin user API

Admin:

```txt
GET   /admin/users
GET   /admin/users/{id}
PATCH /admin/users/{id}/lock
PATCH /admin/users/{id}/unlock
```

---

## 12. Cấu trúc thư mục frontend đề xuất

```txt
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axiosClient.js
│   │   ├── authApi.js
│   │   ├── songApi.js
│   │   ├── artistApi.js
│   │   ├── albumApi.js
│   │   ├── genreApi.js
│   │   ├── playlistApi.js
│   │   ├── favoriteApi.js
│   │   ├── historyApi.js
│   │   └── adminApi.js
│   │
│   ├── app/
│   │   └── store.js
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MusicPlayer.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminTopbar.jsx
│   │   │   └── DataTable.jsx
│   │   │
│   │   ├── songs/
│   │   │   ├── SongCard.jsx
│   │   │   ├── SongList.jsx
│   │   │   ├── SongRow.jsx
│   │   │   └── SongFilter.jsx
│   │   │
│   │   ├── artists/
│   │   │   └── ArtistCard.jsx
│   │   │
│   │   ├── albums/
│   │   │   └── AlbumCard.jsx
│   │   │
│   │   └── playlist/
│   │       ├── PlaylistCard.jsx
│   │       └── AddToPlaylistModal.jsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   ├── player/
│   │   │   └── playerSlice.js
│   │   ├── theme/
│   │   │   └── themeSlice.js
│   │   ├── songs/
│   │   │   └── songSlice.js
│   │   ├── playlists/
│   │   │   └── playlistSlice.js
│   │   └── favorites/
│   │       └── favoriteSlice.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── usePlayer.js
│   │   ├── useTheme.js
│   │   ├── useDebounce.js
│   │   └── useProtectedRoute.js
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SongsPage.jsx
│   │   │   ├── SongDetailPage.jsx
│   │   │   ├── ArtistsPage.jsx
│   │   │   ├── ArtistDetailPage.jsx
│   │   │   ├── AlbumsPage.jsx
│   │   │   ├── AlbumDetailPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── user/
│   │   │   ├── PlaylistPage.jsx
│   │   │   ├── PlaylistDetailPage.jsx
│   │   │   ├── FavoritesPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage.jsx
│   │       ├── AdminSongsPage.jsx
│   │       ├── SongFormPage.jsx
│   │       ├── AdminArtistsPage.jsx
│   │       ├── ArtistFormPage.jsx
│   │       ├── AdminAlbumsPage.jsx
│   │       ├── AlbumFormPage.jsx
│   │       ├── AdminGenresPage.jsx
│   │       └── AdminUsersPage.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatTime.js
│   │   ├── storage.js
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 13. Redux Toolkit slices cần có

### 13.1. `authSlice`

State:

```js
{
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}
```

Actions:

- login
- register
- logout
- getCurrentUser
- loadUserFromStorage

---

### 13.2. `playerSlice`

State:

```js
{
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 70,
  progress: 0,
  currentIndex: 0
}
```

Actions:

- setCurrentSong
- playSong
- pauseSong
- togglePlay
- nextSong
- previousSong
- setVolume
- setProgress
- setQueue
- clearPlayer

---

### 13.3. `themeSlice`

State:

```js
{
  mode: "light";
}
```

Actions:

- toggleTheme
- setTheme
- loadThemeFromStorage

---

### 13.4. `songSlice`

State:

```js
{
  songs: [],
  selectedSong: null,
  filters: {
    keyword: "",
    artistId: "",
    albumId: "",
    genreId: ""
  },
  loading: false,
  error: null
}
```

---

### 13.5. `playlistSlice`

State:

```js
{
  playlists: [],
  selectedPlaylist: null,
  loading: false,
  error: null
}
```

---

### 13.6. `favoriteSlice`

State:

```js
{
  favorites: [],
  loading: false,
  error: null
}
```

---

## 14. Cấu trúc backend Spring Boot đề xuất

```txt
backend/
├── src/main/java/com/example/vietmusic/
│   ├── VietMusicApplication.java
│   │
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── CorsConfig.java
│   │   └── PasswordConfig.java
│   │
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── SongController.java
│   │   ├── ArtistController.java
│   │   ├── AlbumController.java
│   │   ├── GenreController.java
│   │   ├── PlaylistController.java
│   │   ├── FavoriteController.java
│   │   ├── HistoryController.java
│   │   └── admin/
│   │       ├── AdminSongController.java
│   │       ├── AdminArtistController.java
│   │       ├── AdminAlbumController.java
│   │       ├── AdminGenreController.java
│   │       ├── AdminUserController.java
│   │       └── AdminDashboardController.java
│   │
│   ├── dto/
│   │   ├── request/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── SongRequest.java
│   │   │   ├── ArtistRequest.java
│   │   │   ├── AlbumRequest.java
│   │   │   ├── GenreRequest.java
│   │   │   └── PlaylistRequest.java
│   │   │
│   │   └── response/
│   │       ├── ApiResponse.java
│   │       ├── AuthResponse.java
│   │       ├── UserResponse.java
│   │       ├── SongResponse.java
│   │       ├── ArtistResponse.java
│   │       ├── AlbumResponse.java
│   │       ├── GenreResponse.java
│   │       ├── PlaylistResponse.java
│   │       └── DashboardStatsResponse.java
│   │
│   ├── entity/
│   │   ├── User.java
│   │   ├── Song.java
│   │   ├── Artist.java
│   │   ├── Album.java
│   │   ├── Genre.java
│   │   ├── Playlist.java
│   │   ├── Favorite.java
│   │   ├── FavoriteId.java
│   │   ├── PlaylistSong.java
│   │   ├── PlaylistSongId.java
│   │   └── ListeningHistory.java
│   │
│   ├── enums/
│   │   ├── Role.java
│   │   ├── UserStatus.java
│   │   └── CommonStatus.java
│   │
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   ├── ResourceNotFoundException.java
│   │   ├── BadRequestException.java
│   │   └── UnauthorizedException.java
│   │
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── SongRepository.java
│   │   ├── ArtistRepository.java
│   │   ├── AlbumRepository.java
│   │   ├── GenreRepository.java
│   │   ├── PlaylistRepository.java
│   │   ├── FavoriteRepository.java
│   │   └── ListeningHistoryRepository.java
│   │
│   ├── security/
│   │   ├── CustomUserDetails.java
│   │   ├── CustomUserDetailsService.java
│   │   └── JwtService.java
│   │
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── SongService.java
│   │   ├── ArtistService.java
│   │   ├── AlbumService.java
│   │   ├── GenreService.java
│   │   ├── PlaylistService.java
│   │   ├── FavoriteService.java
│   │   ├── HistoryService.java
│   │   └── AdminDashboardService.java
│   │
│   └── mapper/
│       ├── SongMapper.java
│       ├── ArtistMapper.java
│       ├── AlbumMapper.java
│       ├── GenreMapper.java
│       ├── UserMapper.java
│       └── PlaylistMapper.java
│
├── src/main/resources/
│   ├── application.properties
│   └── data.sql
│
└── pom.xml
```

---

## 15. Entity quan hệ chính

### User

- One-to-many với Playlist
- One-to-many với ListeningHistory
- Many-to-many với Song thông qua Favorite

### Artist

- One-to-many với Song
- One-to-many với Album

### Album

- Many-to-one với Artist
- One-to-many với Song

### Genre

- One-to-many với Song

### Song

- Many-to-one với Artist
- Many-to-one với Album
- Many-to-one với Genre
- Many-to-many với Playlist thông qua PlaylistSong
- Many-to-many với User thông qua Favorite

### Playlist

- Many-to-one với User
- Many-to-many với Song thông qua PlaylistSong

---

## 16. Quy tắc bảo mật backend

### Public endpoints

Cho phép không cần đăng nhập:

```txt
GET /api/songs/**
GET /api/artists/**
GET /api/albums/**
GET /api/genres/**
POST /api/auth/login
POST /api/auth/register
```

### User endpoints

Yêu cầu đăng nhập:

```txt
/api/playlists/**
/api/favorites/**
/api/history/**
/api/auth/me
```

### Admin endpoints

Yêu cầu role ADMIN:

```txt
/api/admin/**
```

---

## 17. Response format chung

Tất cả API nên trả về dạng:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Khi lỗi:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

## 18. Validation backend

Dùng annotation:

```java
@NotBlank
@NotNull
@Email
@Size
@Min
@Max
```

Ví dụ:

- Email phải đúng định dạng.
- Password tối thiểu 6 ký tự.
- Tên bài hát không rỗng.
- Tên ca sĩ không rỗng.
- Tên album không rỗng.
- Tên thể loại không rỗng.

---

## 19. Yêu cầu UI component

### Component chung

Cần tạo các component tái sử dụng:

- Button
- Input
- Select
- Modal
- ConfirmDialog
- Loading
- EmptyState
- Pagination
- Badge
- Card
- DataTable

### Component nghe nhạc

- SongCard
- SongRow
- SongList
- MusicPlayer
- AddToPlaylistModal
- FavoriteButton
- PlayButton

---

## 20. Yêu cầu responsive

Website phải responsive tốt trên:

- Desktop
- Tablet
- Mobile

Mobile:

- Sidebar có thể ẩn/hiện.
- Header gọn.
- Player vẫn nằm dưới cùng.
- Card chuyển thành 1 cột.
- Table admin có thể scroll ngang.

---

## 21. Yêu cầu localStorage

Frontend dùng localStorage để lưu:

```txt
token
user
theme
player volume
```

Không lưu dữ liệu nhạy cảm ngoài token.

---

## 22. Seed data mẫu

Cần tạo dữ liệu mẫu cho:

- 1 admin
- 2 user
- 5 ca sĩ
- 5 thể loại
- 5 album
- 20 bài hát

Admin mẫu:

```txt
email: admin@gmail.com
password: 123456
role: ADMIN
```

User mẫu:

```txt
email: user@gmail.com
password: 123456
role: USER
```

Dữ liệu nhạc có thể là nhạc Việt Nam giả lập, không cần link audio thật.

Ví dụ bài hát:

```txt
Chạy Về Khóc Với Anh
Nàng Thơ
Có Chắc Yêu Là Đây
Hẹn Yêu
Ngày Mai Người Ta Lấy Chồng
```

Có thể dùng ảnh URL mẫu từ Unsplash/Pexels hoặc placeholder.

---

## 23. Luồng hoạt động chính

### Luồng nghe nhạc giả lập

1. User vào trang danh sách bài hát.
2. User bấm nút play.
3. Redux lưu `currentSong`.
4. Redux đổi `isPlaying = true`.
5. MusicPlayer hiện ở cuối màn hình.
6. Nếu user đã đăng nhập, gọi API lưu lịch sử nghe.
7. Nếu bấm pause, chỉ đổi `isPlaying = false`.

---

### Luồng thêm yêu thích

1. User bấm icon trái tim.
2. Nếu chưa đăng nhập, chuyển sang trang login.
3. Nếu đã đăng nhập, gọi API thêm vào favorites.
4. Cập nhật Redux favorite state.
5. Đổi màu icon trái tim.

---

### Luồng tạo playlist

1. User vào trang playlist.
2. Bấm tạo playlist.
3. Nhập tên và mô tả.
4. Submit gọi API tạo playlist.
5. Cập nhật danh sách playlist.

---

### Luồng thêm bài hát vào playlist

1. User bấm nút thêm vào playlist trên SongCard.
2. Nếu chưa đăng nhập, chuyển sang login.
3. Nếu đã đăng nhập, mở modal danh sách playlist.
4. User chọn playlist.
5. Gọi API thêm bài hát vào playlist.
6. Hiển thị thông báo thành công.

---

### Luồng admin thêm bài hát

1. Admin vào `/admin/songs`.
2. Bấm thêm bài hát.
3. Nhập thông tin bài hát.
4. Chọn ca sĩ, album, thể loại.
5. Nhập URL ảnh và URL audio.
6. Submit.
7. Backend validate.
8. Lưu vào MariaDB.
9. Chuyển về danh sách bài hát.

---

## 24. Prompt dành cho AI code

Dùng phần dưới đây để yêu cầu AI code sinh dự án:

```txt
Hãy xây dựng một project full-stack website nghe nhạc Việt Nam tên tạm là VietMusic.

Công nghệ:
- Frontend: React, Vite, Tailwind CSS, React Router DOM, Redux Toolkit, Axios.
- Backend: Java Spring Boot, Spring Security, JWT, Spring Data JPA.
- Database: MariaDB.
- Auth: JWT Authentication.
- Role: USER, ADMIN.

Yêu cầu:
1. Xây dựng frontend đầy đủ giao diện người dùng và admin.
2. Xây dựng backend REST API đầy đủ.
3. Thiết kế database MariaDB theo schema trong tài liệu.
4. Có đăng ký, đăng nhập, đăng xuất.
5. Có phân quyền USER và ADMIN.
6. USER có thể xem nhạc, tìm kiếm, lọc, xem chi tiết bài hát, xem ca sĩ, album, tạo playlist, thêm yêu thích, xem lịch sử nghe.
7. ADMIN có thể thêm/sửa/xóa bài hát, ca sĩ, album, thể loại, quản lý user, xem dashboard thống kê.
8. Phần phát nhạc chỉ cần giả lập bằng state, chưa cần phát audio thật.
9. Player vẫn phải có giao diện đầy đủ: play/pause, next/previous, progress bar, volume, ảnh bài hát, tên bài hát, ca sĩ.
10. Dùng Redux Toolkit cho auth, player, theme, songs, playlists, favorites.
11. Dùng localStorage để lưu token, user, theme, volume.
12. Dùng Tailwind CSS thiết kế hiện đại, có dark mode và light mode.
13. Code chia component rõ ràng, có custom hook, có validation form.
14. Backend có DTO, service, repository, controller, mapper, exception handler.
15. API trả về format chung: success, message, data.
16. Có seed data mẫu gồm admin, user, ca sĩ, album, thể loại, bài hát.
17. Viết code chuyên nghiệp, dễ đọc, có comment ở phần quan trọng.
18. Cần cung cấp hướng dẫn chạy frontend, backend và tạo database.

Hãy tạo cấu trúc folder rõ ràng và code đầy đủ từng file quan trọng.
```

---

## 25. Thứ tự nên code dự án

Nên làm theo thứ tự sau:

### Giai đoạn 1: Backend foundation

1. Tạo Spring Boot project.
2. Cấu hình MariaDB.
3. Tạo entity.
4. Tạo repository.
5. Tạo DTO.
6. Tạo mapper.
7. Tạo service.
8. Tạo controller.
9. Tạo exception handler.
10. Test API bằng Postman.

---

### Giai đoạn 2: Auth + Security

1. Tạo register API.
2. Tạo login API.
3. Tạo JWT service.
4. Tạo JWT filter.
5. Cấu hình Spring Security.
6. Phân quyền USER / ADMIN.
7. Test login lấy token.
8. Test admin route.

---

### Giai đoạn 3: Frontend foundation

1. Tạo React Vite project.
2. Cài Tailwind CSS.
3. Cài Redux Toolkit.
4. Cài React Router DOM.
5. Cấu hình Axios.
6. Tạo layout.
7. Tạo route.
8. Tạo protected route.
9. Tạo admin route.
10. Tạo theme dark/light.

---

### Giai đoạn 4: Frontend user pages

1. Trang chủ.
2. Trang danh sách bài hát.
3. Trang chi tiết bài hát.
4. Trang ca sĩ.
5. Trang album.
6. Trang playlist.
7. Trang yêu thích.
8. Trang lịch sử.
9. Music player.

---

### Giai đoạn 5: Frontend admin pages

1. Admin dashboard.
2. Quản lý bài hát.
3. Form thêm/sửa bài hát.
4. Quản lý ca sĩ.
5. Quản lý album.
6. Quản lý thể loại.
7. Quản lý user.

---

### Giai đoạn 6: Hoàn thiện

1. Responsive.
2. Loading state.
3. Empty state.
4. Toast notification.
5. Confirm delete modal.
6. Validation form.
7. Fix UI.
8. Test toàn bộ flow.

---

## 26. Gợi ý package frontend

```bash
npm install @reduxjs/toolkit react-redux react-router-dom axios react-hook-form zod @hookform/resolvers lucide-react clsx
```

Nếu dùng toast:

```bash
npm install react-hot-toast
```

---

## 27. Gợi ý dependencies backend Maven

Cần có:

```txt
spring-boot-starter-web
spring-boot-starter-data-jpa
spring-boot-starter-security
spring-boot-starter-validation
mariadb-java-client
lombok
jjwt-api
jjwt-impl
jjwt-jackson
```

---

## 28. File `.env` frontend

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 29. File `application.properties` backend mẫu

```properties
spring.application.name=vietmusic

spring.datasource.url=jdbc:mariadb://localhost:3306/music_app
spring.datasource.username=root
spring.datasource.password=huyle123
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=your_super_secret_key_here_should_be_long
jwt.expiration=86400000

server.port=8080
```

---

## 30. Tiêu chí hoàn thành

Dự án được xem là hoàn thành khi:

- Chạy được backend Spring Boot.
- Kết nối được MariaDB.
- Đăng ký, đăng nhập được.
- JWT hoạt động.
- Phân quyền USER / ADMIN hoạt động.
- User xem được bài hát, ca sĩ, album.
- User tạo được playlist.
- User thêm được bài hát yêu thích.
- User xem được lịch sử nghe nhạc.
- Admin CRUD được bài hát, ca sĩ, album, thể loại.
- Admin xem được dashboard.
- Giao diện responsive.
- Có dark/light mode.
- Player giả lập hoạt động.
- Code sạch, chia folder rõ ràng.
