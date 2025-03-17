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
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `gid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `detail_address` varchar(255) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gid`),
  UNIQUE KEY `unique_guest` (`name`,`email`,`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (1,'홍길동','01012344567','hong123@google.com','서울 성북구 아리랑로 3','아리랑아파트 3','02830','2025-03-13 07:10:03'),(2,'김삼촌','01011112222','kimUncle@naver.com','서울 강남구 테헤란로13길 8-3','삼촌아파트 101호','06133','2025-03-13 07:13:06'),(3,'박주부','01088999999','ParkJubu@daum.net','대전 동구 판교1길 3','주부아파트 303호','34672','2025-03-13 07:14:56'),(4,'최지진','010-1218-9106','ae5f15@gmail.com','인천광역시 노원구 올림픽대로 13길 31','454호','77450','2025-03-13 08:21:55'),(5,'김나희','01044556699','nahee@naver.com','제주특별자치도 서귀포시 가가로 14','제주아파트 14호','63534','2025-03-13 08:46:53'),(6,'임경희','010-7524-3398','wmfb89@naver.com','인천광역시 종로구 종로 61길 25','1284호','35357','2025-03-13 08:49:46'),(7,'김지혜','01077884455','kimWhisdom@gmail.com','서울 강동구 진황도로 2','아파트 304호','05335','2025-03-13 08:57:45'),(8,'남창희','01084545462','NamChang@daum.net','서울 서대문구 가재울로 6','남창아파트 109호','03693','2025-03-13 09:01:11'),(9,'김희애','01044565954','kimheeEH@daum.net','서울 마포구 희우정로 14','희애아파트 1202호','04020','2025-03-13 09:04:14'),(10,'장지혁','010-4664-2308','utr182@daum.net','대구광역시 노원구 압구정로 79길 9','1427호','27567','2025-03-13 09:08:12'),(11,'김수한무','01045454545','SUHANMU@gmail.com','서울 노원구 수락산로 9','수한아파트 2021호','01660','2025-03-13 09:16:44'),(12,'이서혁','010-3846-2681','ypti82@naver.com','대전광역시 성북구 압구정로 22길 43','1219호','64235','2025-03-13 09:17:36'),(13,'비회원','01044555555','unuser@daum.net','대구 북구 3공단로 3','비회원아파트 110호','41498','2025-03-13 09:18:48'),(14,'강훈호','010-3282-6258','6coz23@gmail.com','대구광역시 강남구 압구정로 61길 21','1523호','83549','2025-03-13 09:19:38'),(15,'김춘삼','01123222322','chunSam2@naver.com','서울 송파구 성남대로 1541-27','춘삼아파트 301호','05843','2025-03-14 00:46:44'),(16,'김석진','010-3255-9306','pxst87@daum.net','대구광역시 성북구 올림픽대로 53길 7','1864호','61354','2025-03-14 00:48:22'),(17,'김길동','01015954545','kimKildong@naver.com','전북특별자치도 남원시 히어실길 8-1','길동아파트 505호','55727','2025-03-14 01:09:45'),(18,'윤현희','010-7628-1554','77yn67@naver.com','대구광역시 서초구 청담로 91길 34','324호','45454','2025-03-14 01:10:30'),(19,'홍길순','01012311212','KILLSOON@gmail.com','대전 동구 판교1길 3','길순아파트 1401','34672','2025-03-14 01:22:18'),(20,'황현희','01045644544','hyunhee@naver.com','서울 강남구 남부순환로 2609','현희아파트 1010호','06267','2025-03-14 01:25:42'),(21,'김배달','01011111111','deliveryKIM@daum.net','서울 용산구 백범로 250','배달아파트 404호','04355','2025-03-14 01:28:30'),(22,'라시현','01045454545','rasihyun@naver.com','대구 군위군 의흥면 가지골길 34-9','시현아파트 1101','43150','2025-03-14 01:33:21'),(23,'이희수','01077887777','heesu@naver.com','제주특별자치도 서귀포시 가가로 14','희수아파트 1121호','63534','2025-03-14 02:40:37'),(24,'김지희','01045454545','jihee@gmail.com','서울 종로구 지봉로 1','지혜 아파트 201호','03120','2025-03-14 06:00:59'),(25,'김항수','01045455656','hangsu@naver.com','서울 성북구 아리랑로 3','항수아파트 2020호','02830','2025-03-14 06:11:38');
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 10:58:50
