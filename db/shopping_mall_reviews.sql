-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: shopping_mall
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `review_text` text,
  `status` enum('Pending','Approved','Rejected','Shipped','Delivered','Reviewed') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rid`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`pid`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`oid`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` >= 0) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1001,1,5.0,'몸에 아주 딱 맞아요.','Delivered','2025-03-13 07:08:22','2025-03-13 07:08:22'),(2,1,1049,2,4.0,'발이 살짝 아프네요.','Delivered','2025-03-13 07:08:30','2025-03-13 07:08:30'),(3,3,1017,4,5.0,'몸에 딱 맞아서 좋아요.','Delivered','2025-03-13 07:19:04','2025-03-13 07:19:04'),(4,3,1035,5,4.0,'밑단이 생각보다 짧아요.','Delivered','2025-03-13 07:19:20','2025-03-13 07:19:20'),(5,41,1015,6,5.0,'매우 편하게 입고 있어요','Delivered','2025-03-13 07:26:27','2025-03-13 07:26:27'),(6,41,1014,7,5.0,'매우 편하게 입고 있어요','Delivered','2025-03-13 07:26:34','2025-03-13 07:26:34'),(7,41,1041,8,4.0,'생각보다 작네요','Delivered','2025-03-13 07:26:44','2025-03-13 07:26:44'),(8,41,1023,9,3.0,'이물질이 묻어 있어요','Delivered','2025-03-13 07:26:55','2025-03-13 07:26:55'),(9,5,1022,10,5.0,'매우 잘 입고 있어요','Delivered','2025-03-13 07:29:23','2025-03-13 07:29:23'),(10,5,1048,11,5.0,'신발이 너무 이뻐요','Delivered','2025-03-13 07:29:28','2025-03-13 07:29:28'),(11,29,1018,33,5.0,'몸에 딱 맞는 핏입니다','Delivered','2025-03-13 09:02:50','2025-03-13 09:02:50'),(12,1,1041,40,5.0,'정말 멋져요','Delivered','2025-03-13 09:15:11','2025-03-13 09:15:11'),(13,1,1049,39,5.0,'신기 너무 편해요','Delivered','2025-03-13 09:15:17','2025-03-13 09:15:17'),(14,1,1001,38,5.0,'입기 너무 좋아요','Delivered','2025-03-13 09:15:22','2025-03-13 09:15:22'),(15,10,1049,48,5.0,'발이 편해요','Delivered','2025-03-14 01:24:53','2025-03-14 01:24:53'),(16,18,1049,52,5.0,'아주 편해요','Delivered','2025-03-14 01:30:04','2025-03-14 01:30:04'),(17,18,1020,51,5.0,'아주 편해요','Delivered','2025-03-14 01:30:10','2025-03-14 01:30:10'),(18,17,1009,49,5.0,'몸에 딱 맞아요','Delivered','2025-03-14 01:36:15','2025-03-14 01:36:15'),(19,17,1007,50,4.0,'매우 잘 입고 있습니다','Delivered','2025-03-14 01:36:22','2025-03-14 01:36:22'),(20,17,1034,54,5.0,'바지가 이뻐요','Delivered','2025-03-14 01:37:20','2025-03-14 01:37:20'),(21,17,1040,53,5.0,'바지가 이뻐요','Delivered','2025-03-14 01:37:25','2025-03-14 01:37:25'),(22,15,1006,56,5.0,'너무 좋아요','Delivered','2025-03-14 02:39:12','2025-03-14 02:39:12'),(23,15,1014,55,5.0,'내 인생템','Delivered','2025-03-14 02:39:17','2025-03-14 02:39:17'),(24,21,1014,59,5.0,'아주 좋아요','Delivered','2025-03-14 02:41:32','2025-03-14 02:41:32'),(25,21,1002,58,5.0,'아주 좋아요','Delivered','2025-03-14 02:41:37','2025-03-14 02:41:37'),(26,21,1001,57,5.0,'아주 좋아요','Delivered','2025-03-14 02:41:40','2025-03-14 02:41:40'),(27,21,1018,62,5.0,'색상이 예쁘네요','Delivered','2025-03-14 02:44:06','2025-03-14 02:44:06'),(28,21,1040,61,4.0,'바지가 살짝 불편하네요','Delivered','2025-03-14 02:44:14','2025-03-14 02:44:14'),(29,21,1001,60,4.0,'옷감이 조금 별로네요','Delivered','2025-03-14 02:44:21','2025-03-14 02:44:21'),(30,16,1001,63,5.0,'아주 만족합니다','Delivered','2025-03-14 02:46:49','2025-03-14 02:46:49'),(31,16,1012,29,5.0,'아주 만족합니다','Delivered','2025-03-14 02:46:53','2025-03-14 02:46:53'),(32,16,1047,30,5.0,'아주 만족합니다','Delivered','2025-03-14 02:46:57','2025-03-14 02:46:57'),(33,19,1001,64,4.0,'살짝 별로네요','Delivered','2025-03-14 02:47:34','2025-03-14 02:47:34'),(34,3,1014,65,5.0,'너무 멋지네요','Delivered','2025-03-14 03:28:43','2025-03-14 03:28:43'),(35,3,1009,66,4.0,'살짝 무겁네요','Delivered','2025-03-14 03:28:49','2025-03-14 03:28:49'),(36,3,1034,67,5.0,'멋있네요','Delivered','2025-03-14 03:46:04','2025-03-14 03:46:04'),(37,3,1013,68,4.0,'살짝 아쉬워요','Delivered','2025-03-14 03:46:09','2025-03-14 03:46:09'),(38,3,1014,77,5.0,'너무 멋지네요','Delivered','2025-03-14 04:27:24','2025-03-14 04:27:24'),(39,42,1014,78,5.0,'몸에 잘 맞아요','Delivered','2025-03-14 04:28:57','2025-03-14 04:28:57'),(40,2,1001,96,3.0,'이번 건 좀 별로네요','Delivered','2025-03-14 06:02:38','2025-03-14 06:02:38'),(41,2,1007,95,4.0,'살짝 아쉬워요','Delivered','2025-03-14 06:02:48','2025-03-14 06:02:48'),(42,2,1001,98,5.0,'이번엔 좋네요','Delivered','2025-03-14 06:02:52','2025-03-14 06:02:52'),(43,2,1007,97,5.0,'매우 이뻐요','Delivered','2025-03-14 06:02:56','2025-03-14 06:02:56'),(44,2,1022,99,5.0,'색이 너무 이뻐요','Delivered','2025-03-14 06:05:22','2025-03-14 06:05:22'),(45,42,1001,88,5.0,'색이 괜찮아요','Delivered','2025-03-14 06:10:08','2025-03-14 06:10:08'),(46,42,1012,100,5.0,'몸에 잘 맞아요','Delivered','2025-03-14 06:10:56','2025-03-14 06:10:56'),(47,43,1014,101,5.0,'아주 좋아요','Delivered','2025-03-14 06:14:48','2025-03-14 06:14:48'),(48,43,1023,102,5.0,'그림이 이뻐요','Delivered','2025-03-14 06:14:54','2025-03-14 06:14:54');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 10:58:51
