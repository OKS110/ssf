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
-- Table structure for table `guest_orders`
--

DROP TABLE IF EXISTS `guest_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_orders` (
  `g_oid` int NOT NULL AUTO_INCREMENT,
  `guest_id` int NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `total_price` int NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `zipcode` varchar(20) NOT NULL,
  `shipping_address` varchar(255) NOT NULL DEFAULT '',
  `detail_address` varchar(255) NOT NULL,
  `delivery_message` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Shipped','Delivered','Cancelled','Returned') DEFAULT 'Pending',
  `refund_amount` int DEFAULT '0',
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(50) NOT NULL,
  PRIMARY KEY (`g_oid`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `guest_id` (`guest_id`),
  CONSTRAINT `guest_orders_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`gid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_orders`
--

LOCK TABLES `guest_orders` WRITE;
/*!40000 ALTER TABLE `guest_orders` DISABLE KEYS */;
INSERT INTO `guest_orders` VALUES (1,1,'G_ORD-1741849803537-1','NIKE','Trendy Long Wool Coat',101967,1,'M','Brown','02830','서울 성북구 아리랑로 3','아리랑아파트 3','천천히 와주세요','Delivered',0,'2025-03-13 07:10:03','naver'),(2,2,'G_ORD-1741849986337-2','PRADA','Metropolitan Classic Overcoat',380528,2,'L','LightGray','06133','서울 강남구 테헤란로13길 8-3','삼촌아파트 101호','삼촌입니다.','Delivered',0,'2025-03-13 07:13:06','toss'),(3,3,'G_ORD-1741850096835-3','MUSINSA','Modern Luxury High-Waist Trousers',241197,1,'30','Yellow','34672','대전 동구 판교1길 3','주부아파트 303호','빨리 와주세요','Delivered',0,'2025-03-13 07:14:56','kakao'),(4,4,'G_ORD-1741854115859-4','PRADA','Avant-Garde Chic Soft Sweater',218930,1,'M','IVORY','77450','인천광역시 노원구 올림픽대로 13길 31','454호','감사합니다^^','Delivered',0,'2025-03-13 08:21:55','kakao'),(5,5,'G_ORD-1741855613830-5','PRADA','Avant-Garde Timeless Skinny Denim Jeans',96258,1,'30','Navy','63534','제주특별자치도 서귀포시 가가로 14','제주아파트 14호','비행기 타고 오세요','Delivered',0,'2025-03-13 08:46:53','kakao'),(6,6,'G_ORD-1741855786275-6','GUCCI','Chic Timeless Elegant Kitten Heels',152107,1,'230','LightGray','35357','인천광역시 종로구 종로 61길 25','1284호','빨리 와주세요^^','Delivered',0,'2025-03-13 08:49:46','toss'),(7,7,'G_ORD-1741856265189-7','GUCCI','Luxury Refined Urban Tee',436498,2,'S','SkyBlue','05335','서울 강동구 진황도로 2','아파트 304호','HURRY UP','Delivered',0,'2025-03-13 08:57:45','kakao'),(8,8,'G_ORD-1741856471650-8','PRADA','Metropolitan Classic Overcoat',380528,2,'M','LightGray','03693','서울 서대문구 가재울로 6','남창아파트 109호','빨리 와주세요','Delivered',0,'2025-03-13 09:01:11','kakao'),(9,9,'G_ORD-1741856654449-9','PRADA','Avant-Garde Timeless Skinny Denim Jeans',96258,1,'30','Navy','04020','서울 마포구 희우정로 14','희애아파트 1202호','빨리 오세요 희희','Delivered',0,'2025-03-13 09:04:14','MOBIL_PON_PAY'),(10,10,'G_ORD-1741856892667-10','PRADA','Metropolitan Classic Overcoat',380528,2,'XL','LightGray','27567','대구광역시 노원구 압구정로 79길 9','1427호','천천히 와주세요','Delivered',0,'2025-03-13 09:08:12','kakao'),(11,11,'G_ORD-1741857404681-11','MUSINSA','Elegant Luxury Low-Top Sneakers',175289,1,'235','Brown','01660','서울 노원구 수락산로 9','수한아파트 2021호','어서 오시오','Pending',0,'2025-03-13 09:16:44','toss'),(12,12,'G_ORD-1741857456378-12','GUCCI','Prestige Long Wool Coat',226586,2,'L','Black','64235','대전광역시 성북구 압구정로 22길 43','1219호','천천히 오세요','Pending',0,'2025-03-13 09:17:36','MOBIL_PON_PAY'),(13,13,'G_ORD-1741857528513-13','BEANPOLE','Minimal Timeless Penny Loafers',399086,2,'235','Yellow','41498','대구 북구 3공단로 3','비회원아파트 110호','빨리 오세요','Pending',0,'2025-03-13 09:18:48','MOBIL_PON_PAY'),(14,14,'G_ORD-1741857578586-14','NIKE','Trendy Long Wool Coat',203934,2,'S','Navy','83549','대구광역시 강남구 압구정로 61길 21','1523호','천천히 오세요','Delivered',0,'2025-03-13 09:19:38','naver'),(15,14,'G_ORD-1741857612969-14','PRADA','Avant-Garde Chic Soft Sweater',437860,2,'S','Blue','83549','대구광역시 강남구 압구정로 61길 21','1523호','천천히 오세요','Delivered',0,'2025-03-13 09:20:12','payco'),(16,15,'G_ORD-1741913204514-15','MUSINSA','Sleek Premium Wide-Leg Jeans',368154,2,'30','Navy','05843','서울 송파구 성남대로 1541-27','춘삼아파트 301호','빨리 와주세요','Delivered',0,'2025-03-14 00:46:44','payco'),(17,16,'G_ORD-1741913302603-16','PRADA','Avant-Garde Chic Soft Sweater',437860,2,'L','Black','61354','대구광역시 성북구 올림픽대로 53길 7','1864호','빨리 와주세요','Delivered',0,'2025-03-14 00:48:22','toss'),(18,16,'G_ORD-1741913615263-16','PRADA','Avant-Garde Chic Soft Sweater',437860,2,'L','Black','61354','대구광역시 성북구 올림픽대로 53길 7','1864호','천천히 와주세요','Delivered',0,'2025-03-14 00:53:35','naver'),(19,16,'G_ORD-1741913706846-16','브랜드 정보 없음','상품명 없음',0,1,'','','61354','대구광역시 성북구 올림픽대로 53길 7','1864호','천천히 오세요','Delivered',0,'2025-03-14 00:55:06','naver'),(20,17,'G_ORD-1741914585271-17','BEANPOLE','Minimal Timeless Penny Loafers',199543,1,'250','Black','55727','전북특별자치도 남원시 히어실길 8-1','길동아파트 505호','천천히 와주세요','Delivered',0,'2025-03-14 01:09:45','toss'),(21,18,'G_ORD-1741914630297-18','PRADA','Timeless Sophisticated Mock Neck Knit',269106,2,'L','IVORY','45454','대구광역시 서초구 청담로 91길 34','324호','빨리 와주세요','Delivered',0,'2025-03-14 01:10:30','MOBIL_PON_PAY'),(22,18,'G_ORD-1741914979436-18','PRADA','Timeless Sophisticated Mock Neck Knit',269106,2,'L','IVORY','45454','대구광역시 서초구 청담로 91길 34','324호','빨리 오세요','Delivered',0,'2025-03-14 01:16:19','VIRTL_BNK_ACCT_PAY'),(23,19,'G_ORD-1741915338164-19','PRADA','Contemporary Premium Wide-Leg Jeans',80325,1,'30','Navy','34672','대전 동구 판교1길 3','길순아파트 1401','빨리 와주세요','Delivered',0,'2025-03-14 01:22:18','toss'),(24,20,'G_ORD-1741915542612-20','BEANPOLE','Luxury Timeless Skinny Denim Jeans',222709,1,'30','Black','06267','서울 강남구 남부순환로 2609','현희아파트 1010호','빨리 와주세요','Delivered',0,'2025-03-14 01:25:42','MOBIL_PON_PAY'),(25,21,'G_ORD-1741915710708-21','NIKE','Trendy Long Wool Coat',101967,1,'S','Black','04355','서울 용산구 백범로 250','배달아파트 404호','빨리 와주세요 배달의 민족이니까','Delivered',0,'2025-03-14 01:28:30','toss'),(26,22,'G_ORD-1741916001852-22','NIKE','Avant-Garde Elegant Silk Shirt',381572,2,'L','Black','43150','대구 군위군 의흥면 가지골길 34-9','시현아파트 1101','빨리 와주세요^^','Delivered',0,'2025-03-14 01:33:21','kakao'),(27,23,'G_ORD-1741920037356-23','GUCCI','Prestige Long Wool Coat',226586,2,'M','Black','63534','제주특별자치도 서귀포시 가가로 14','희수아파트 1121호','비행기 타고 오십쇼','Delivered',0,'2025-03-14 02:40:37','naver'),(28,24,'G_ORD-1741932059817-24','GUCCI','Prestige Long Wool Coat',113293,1,'M','White','03120','서울 종로구 지봉로 1','지혜 아파트 201호','천천히 오세요','Delivered',0,'2025-03-14 06:00:59','toss'),(29,25,'G_ORD-1741932698091-25','BEANPOLE','Metropolitan Sophisticated Silk Blouse',231255,1,'S','LightPink','02830','서울 성북구 아리랑로 3','항수아파트 2020호','천천히 오세요','Delivered',0,'2025-03-14 06:11:38','kakao');
/*!40000 ALTER TABLE `guest_orders` ENABLE KEYS */;
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
