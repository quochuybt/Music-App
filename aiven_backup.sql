-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: vietmusic-mysql-quochuybt2005-46da.h.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `image_url` text,
  `release_year` int DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `title` varchar(150) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `artist_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK72gqyi6l1j674radjyitcm86f` (`artist_id`),
  CONSTRAINT `FK72gqyi6l1j674radjyitcm86f` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bio` text,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` text,
  `name` varchar(150) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (6,NULL,'2026-06-08 13:29:43.741168','https://yt3.ggpht.com/6_Aep_88kiQuiy16FH2JfgTf-kDCYLtvQ4qwHpH0wOCKwvCCwOAr0qea8Rp6nN2OQItyGco5Xg=s88-c-k-c0x00ffffff-no-rj','Minh Huy','ACTIVE','2026-06-08 13:29:43.741168'),(7,NULL,'2026-06-08 13:39:17.936876','https://yt3.ggpht.com/tjO_cpAs12qMZk01Lja3ffCzPOm8ULoZOrq0U3meb6pzYv0dEd_v7XHEzsW1frweWMvw2X5XCg=s88-c-k-c0x00ffffff-no-rj','Việt Anh','ACTIVE','2026-06-08 13:39:17.936876'),(8,NULL,'2026-06-08 13:40:54.268141','https://yt3.ggpht.com/_5_Y9gyoNvnPt64FfdxZELuAVKFk-eTjCs6k2qMboXWTtwdrjHvm8p6jf8ZZSTxk0NK9U-INtQ=s88-c-k-c0x00ffffff-no-rj','tlinh','ACTIVE','2026-06-08 13:40:54.268141'),(9,NULL,'2026-06-11 04:11:53.615648','https://yt3.googleusercontent.com/JjXWXfuT6jdhSMCe1jTk_VGx9dnkw3BtnJRdswXg-3aESzuFLnqtQKhJob0-piIplU_71YaC=s120-c-k-c0x00ffffff-no-rj','Soobin Hoàng Sơn','ACTIVE','2026-06-11 04:11:53.615648'),(11,NULL,'2026-06-11 04:19:01.108154','https://yt3.ggpht.com/OMWK6EO7ZsmYjvIIOm-0ZlKjiTScnfIJuXyhtWurPq0unO_3vEG78Nf67eDxOv95v0EKBxCqLw=s88-c-k-c0x00ffffff-no-rj','Tuấn Hưng','ACTIVE','2026-06-11 04:19:01.108154');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `created_at` datetime(6) DEFAULT NULL,
  `song_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`song_id`,`user_id`),
  KEY `FKk7du8b8ewipawnnpg76d55fus` (`user_id`),
  CONSTRAINT `FKk7du8b8ewipawnnpg76d55fus` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqs8yha6nwtpmpq4xa0yro7gwj` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES ('2026-06-08 16:21:17.687085',21,7);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(100) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpe1a9woik1k97l87cieguyhh4` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (6,'2026-06-08 13:35:33.000000','Nhạc pop','Pop','ACTIVE','2026-06-08 13:35:33.000000'),(7,'2026-06-08 13:35:33.000000','Nhạc ballad','Ballad','ACTIVE','2026-06-08 13:35:33.000000'),(8,'2026-06-08 13:35:33.000000','Rhythm and blues','R&B','ACTIVE','2026-06-08 13:35:33.000000'),(9,'2026-06-08 13:35:33.000000','Nhạc indie','Indie','ACTIVE','2026-06-08 13:35:33.000000'),(10,'2026-06-08 13:35:33.000000','Nhạc dance','Dance','ACTIVE','2026-06-08 13:35:33.000000'),(11,'2026-06-08 13:35:33.000000','Rap và hip-hop','Rap / Hip-hop','ACTIVE','2026-06-08 13:35:33.000000'),(12,'2026-06-08 13:35:33.000000','Electronic dance music','EDM','ACTIVE','2026-06-08 13:35:33.000000'),(13,'2026-06-08 13:35:33.000000','Nhạc rock','Rock','ACTIVE','2026-06-08 13:35:33.000000'),(14,'2026-06-08 13:35:33.000000','Nhạc acoustic','Acoustic','ACTIVE','2026-06-08 13:35:33.000000'),(15,'2026-06-08 13:35:33.000000','Dùng cho bài hát chưa xác định thể loại','Chưa phân loại','ACTIVE','2026-06-08 13:35:33.000000');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listening_history`
--

DROP TABLE IF EXISTS `listening_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listening_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `listened_at` datetime(6) DEFAULT NULL,
  `song_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKco2nfytj1d7qydxanmxxum3tb` (`user_id`,`song_id`),
  KEY `FKgyicx6nbi7yslcfxx43smsocr` (`song_id`),
  CONSTRAINT `FKbq59qwja6t72iqorkkme7wikb` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKgyicx6nbi7yslcfxx43smsocr` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listening_history`
--

LOCK TABLES `listening_history` WRITE;
/*!40000 ALTER TABLE `listening_history` DISABLE KEYS */;
INSERT INTO `listening_history` VALUES (1,'2026-06-09 12:56:07.408962',21,1),(2,'2026-06-11 04:06:15.606596',22,1),(3,'2026-06-08 14:07:14.055942',22,2),(4,'2026-06-08 14:23:41.354960',21,2),(5,'2026-06-08 15:12:24.864827',22,5),(6,'2026-06-08 15:12:33.156151',21,5),(7,'2026-06-08 15:21:10.540287',23,5),(8,'2026-06-08 16:03:03.135786',22,6),(9,'2026-06-08 16:21:33.653989',23,7),(10,'2026-06-08 16:21:46.168871',22,7);
/*!40000 ALTER TABLE `listening_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_songs`
--

DROP TABLE IF EXISTS `playlist_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_songs` (
  `added_at` datetime(6) DEFAULT NULL,
  `playlist_id` bigint NOT NULL,
  `song_id` bigint NOT NULL,
  PRIMARY KEY (`playlist_id`,`song_id`),
  KEY `FK5xu79gpgpc1p4tku7j6dv2skb` (`song_id`),
  CONSTRAINT `FK5xu79gpgpc1p4tku7j6dv2skb` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  CONSTRAINT `FKqfutupgj870d2k31ldxqqwr8w` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_songs`
--

LOCK TABLES `playlist_songs` WRITE;
/*!40000 ALTER TABLE `playlist_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(150) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtgjwvfg23v990xk7k0idmqbrj` (`user_id`),
  CONSTRAINT `FKtgjwvfg23v990xk7k0idmqbrj` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `audio_url` text,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `duration` varchar(255) DEFAULT NULL,
  `image_url` text,
  `play_count` bigint NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `title` varchar(150) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `album_id` bigint DEFAULT NULL,
  `artist_id` bigint NOT NULL,
  `genre_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKte4gkb2cqtk2erfa87oopj2cj` (`album_id`),
  KEY `FKdjq2ujqovw5rc14q60f8p6b6e` (`artist_id`),
  KEY `FKd5mor9lg3wkqhn2tp0r75nkm` (`genre_id`),
  CONSTRAINT `FKd5mor9lg3wkqhn2tp0r75nkm` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `FKdjq2ujqovw5rc14q60f8p6b6e` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`),
  CONSTRAINT `FKte4gkb2cqtk2erfa87oopj2cj` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (21,'https://res.cloudinary.com/dtw9an8ly/video/upload/v1780925853/vietmusic/audio/b44917f8-5725-46a0-99d6-6699fa1b09bc.mp4','2026-06-08 13:37:35.601837','','4:35','https://i.ytimg.com/vi/sPQXOA6pzOg/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDRY9kazSLiIjZLY_9qJ0oWc7xHwA',8,'ACTIVE','Ngày rời chuyến bay','2026-06-09 12:56:07.649914',NULL,6,7),(22,'https://res.cloudinary.com/dtw9an8ly/video/upload/v1780926015/vietmusic/audio/b6e0508e-5e07-4677-bd55-d4068455641b.mp3','2026-06-08 13:40:17.678910','','4:21','https://i.ytimg.com/vi/9IWNmqHW43I/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCp0CmTnBFvpLC3xvewjanWjLSQ5w',7,'ACTIVE','Ngày này năm ấy','2026-06-11 04:06:15.941097',NULL,7,7),(23,'https://res.cloudinary.com/dtw9an8ly/video/upload/v1780926083/vietmusic/audio/50dc2e17-fd80-442d-ba91-f49d8f62510e.mp3','2026-06-08 13:41:26.346001','','5:25','https://i.ytimg.com/vi/fyMgBQioTLo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAC0eQiNHs3k10YiyAkNMafKFASQ',3,'ACTIVE','Nếu lúc đó','2026-06-08 16:21:33.794835',NULL,8,11),(24,'https://res.cloudinary.com/dtw9an8ly/video/upload/v1781151448/vietmusic/audio/2b0deda3-e260-4540-9cf3-0c2cd810288f.mp3','2026-06-11 04:17:51.511748','','4:28','https://i.ytimg.com/vi/_w2PR0Sko8g/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCnZFAdVaSTa0dZq2uBx0R2Les-7Q',0,'ACTIVE','Xin Đừng Lặng Im','2026-06-11 04:17:51.511748',NULL,9,7),(25,'https://res.cloudinary.com/dtw9an8ly/video/upload/v1781151721/vietmusic/audio/117a7473-25e3-4964-aa68-f409685e87e9.mp3','2026-06-11 04:22:23.690742','','4:12','https://i.ytimg.com/vi/SPn106LGnjU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCXvoGSKJta6k9ZDngA5-Rqbf11LQ',0,'ACTIVE','Anh nhớ em','2026-06-11 04:22:23.690742',NULL,11,7);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_url` text,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `status` enum('ACTIVE','LOCKED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'2026-06-03 00:30:00.680884','quochuy@gmail.com','Quoc Huy','$2a$10$PTW2Id7dzeGfeEBAGwMKl.FZ1aY4MB3XZzTu4bDt4xrsGzFwCj9E.','ADMIN','ACTIVE','2026-06-03 00:30:00.680884'),(2,NULL,'2026-06-03 00:30:01.079411','user@gmail.com','User Demo','$2a$10$JG6lTbzG4P4/SJdJBLlnueGC8s31eNcPu04MIlyHoMwZuL2x4cIR2','USER','ACTIVE','2026-06-03 00:30:01.079411'),(3,NULL,'2026-06-03 00:30:01.460746','listener@gmail.com','Listener Demo','$2a$10$xqHO9DsRi7Xg3b84Ho1ClOOvsv.AUwi9IX8Rl4ipWN2oilTmdmvNm','USER','ACTIVE','2026-06-03 00:30:01.460746'),(4,'https://lh3.googleusercontent.com/a/ACg8ocJBaO3iV3B8Tkxf9VVrFbs2q7cd-V8iUg_RAtRGGGWLY14I5g=s96-c','2026-06-08 14:50:18.882862','sakubadao2005@gmail.com','nguyen hung','$2a$10$/c9jg81JmN7mxLTw..WAc.PX9X.oXAz3cHYxWLrq9IEY/lM0TaF.S','USER','ACTIVE','2026-06-08 14:50:18.882862'),(5,'https://lh3.googleusercontent.com/a/ACg8ocLmauxFbQ1X3SY9OoT3ZAbalb7nuMC8AHS67d2IWfqxtqxY8Q=s96-c','2026-06-08 15:12:18.521322','huyl61806@gmail.com','Huy Lê','$2a$10$ajzXM2EtUefYjyYLYkyR7ul8vDf/kRAeS/qlUgqpzRQqexC34BhXm','USER','ACTIVE','2026-06-08 15:12:18.521322'),(6,'https://lh3.googleusercontent.com/a/ACg8ocIKzG7LCex1fflHORqvjFeBNwwOLVT8FtoZjggnZ-040Dzq6-A2ww=s96-c','2026-06-08 15:26:49.609235','phamlan290705@gmail.com','Trúc Lan','$2a$10$udYQX0dOpH4aNtbqX90ViujORqDIaEGtwvACclMk41McPJB.C3RYG','USER','ACTIVE','2026-06-08 15:26:49.609235'),(7,'https://lh3.googleusercontent.com/a/ACg8ocJQ2J8vlDHoWIrQkYxWDhwSbNF9l46UsGGTMV4y297Id1bxIhxW=s96-c','2026-06-08 16:20:57.655302','thuchuynh0941@gmail.com','Thức Huỳnh','$2a$10$mgG/xgQNERcByC4npUkIOOM8jnrNz4nNlldnurIxg.9ZfxHfeQIbq','USER','ACTIVE','2026-06-08 16:20:57.655302');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'defaultdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 12:34:09
