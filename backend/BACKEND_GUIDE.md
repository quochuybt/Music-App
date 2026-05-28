# VietMusic Backend Guide

## Database

Create MariaDB database:

```sql
CREATE DATABASE music_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update credentials in `src/main/resources/application.properties` if your local MariaDB user/password differs.

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

Seed accounts are created automatically on first empty database startup:

- Admin: `quochuy@gmail.com` / `huyle123`
- User: `user@gmail.com` / `123456`

## Sample Requests

Login:

```http
POST /api/auth/login
Content-Type: application/json

{"email":"quochuy@gmail.com","password":"huyle123"}
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
