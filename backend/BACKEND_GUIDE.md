# VietMusic Backend Guide

## Database

Create MariaDB database:

```sql
CREATE DATABASE music_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Use the variables listed in `.env.example` for your shell, IDE run configuration, or deployment environment.

## Run

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

API base URL: `http://localhost:8080/api`

Seed accounts are created only when `APP_SEED_ENABLED=true` and seed passwords are configured:

- Admin email: `quochuy@gmail.com`
- User email: `user@gmail.com`

## Sample Requests

Login:

```http
POST /api/auth/login
Content-Type: application/json

{"email":"quochuy@gmail.com","password":"<APP_SEED_ADMIN_PASSWORD>"}
```

Create song as admin:

```http
POST /api/admin/songs
Authorization: Bearer <token>
Content-Type: application/json

{"title":"Nang Tho","artistId":1,"albumId":1,"genreId":1,"imageUrl":"https://picsum.photos/600","audioUrl":"https://example.com/nang-tho.mp3","duration":"04:12","description":"Demo","status":"ACTIVE"}
```

Favorite a song:

```http
POST /api/favorites/1
Authorization: Bearer <token>
```

Create playlist and add song:

```http
POST /api/playlists
Authorization: Bearer <token>
Content-Type: application/json

{"name":"Nhac yeu thich","description":"Playlist ca nhan"}
```

```http
POST /api/playlists/1/songs/1
Authorization: Bearer <token>
```

Save listening history:

```http
POST /api/history/1
Authorization: Bearer <token>
```
