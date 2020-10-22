-- MySQL dump 10.13  Distrib 5.6.49, for Linux (x86_64)
--
-- Host: localhost    Database: boilerplate
-- ------------------------------------------------------
-- Server version	5.6.49

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_assignment`
--

DROP TABLE IF EXISTS `auth_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_assignment` (
  `item_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`),
  KEY `idx-auth_assignment-user_id` (`user_id`),
  CONSTRAINT `auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_assignment`
--

LOCK TABLES `auth_assignment` WRITE;
/*!40000 ALTER TABLE `auth_assignment` DISABLE KEYS */;
INSERT INTO `auth_assignment` VALUES ('admin','1',1600181804),('manageSettings','2',1600181804),('manageStaffs','2',1600181804),('manageUsers','2',1600181804),('staff','2',1600181804),('user','3',1600181804),('user','4',1600315873),('user','5',1600316081),('user','6',1600362455),('user','7',1600362681);
/*!40000 ALTER TABLE `auth_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_item`
--

DROP TABLE IF EXISTS `auth_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_item` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `type` smallint(6) NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `rule_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` blob,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `idx-auth_item-type` (`type`),
  CONSTRAINT `auth_item_ibfk_1` FOREIGN KEY (`rule_name`) REFERENCES `auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_item`
--

LOCK TABLES `auth_item` WRITE;
/*!40000 ALTER TABLE `auth_item` DISABLE KEYS */;
INSERT INTO `auth_item` VALUES ('admin',1,'Administrator',NULL,NULL,1600181804,1600181804),('manageSettings',2,'Manage settings',NULL,NULL,1600181804,1600181804),('manageStaffs',2,'Manage staffs',NULL,NULL,1600181804,1600181804),('manageUsers',2,'Manage users',NULL,NULL,1600181804,1600181804),('staff',1,'Staff',NULL,NULL,1600181804,1600181804),('user',1,'User',NULL,NULL,1600181804,1600181804);
/*!40000 ALTER TABLE `auth_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_item_child`
--

DROP TABLE IF EXISTS `auth_item_child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_item_child` (
  `parent` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `child` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`),
  CONSTRAINT `auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_ibfk_2` FOREIGN KEY (`child`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_item_child`
--

LOCK TABLES `auth_item_child` WRITE;
/*!40000 ALTER TABLE `auth_item_child` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_item_child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_rule`
--

DROP TABLE IF EXISTS `auth_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_rule` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `data` blob,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_rule`
--

LOCK TABLES `auth_rule` WRITE;
/*!40000 ALTER TABLE `auth_rule` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matched_providers`
--

DROP TABLE IF EXISTS `matched_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matched_providers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `_ID` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matched_providers`
--

LOCK TABLES `matched_providers` WRITE;
/*!40000 ALTER TABLE `matched_providers` DISABLE KEYS */;
INSERT INTO `matched_providers` VALUES (1,'0,3','Chuck Norris','chuck@gmail.com','+123456789','258',2),(2,'1,2','Juan Perez','jperez2020@gmail.com','+145278953','123',0),(16,'0,2','Juan Gonzales','juango@gmail.com','+52553454687','3658',0);
/*!40000 ALTER TABLE `matched_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `version` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES ('m000000_000000_base',1600181790),('m140506_102106_rbac_init',1600181792),('m170125_081951_create_setting_table',1600181804),('m170125_082006_create_user_table',1600181804),('m170506_004517_init_rbac',1600181804),('m170907_052038_rbac_add_index_on_auth_assignment_user_id',1600181792),('m180523_151638_rbac_updates_indexes_without_prefix',1600181792),('m200409_110543_rbac_update_mssql_trigger',1600181792),('m200916_224122_create_matched_providers_table',1600308232);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meta_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_desc` text COLLATE utf8_unicode_ci,
  `meta_attribute` text COLLATE utf8_unicode_ci,
  `meta_value` longtext COLLATE utf8_unicode_ci,
  `is_public` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx-setting` (`meta_key`,`meta_type`,`is_public`,`status`,`created_at`,`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,'timezone','Timezone','select','Set the time zone of the application','{\"list\":[{\"value\":\"Australia/Adelaide\",\"label\":\"Australia/Adelaide\"},{\"value\":\"Australia/Brisbane\",\"label\":\"Australia/Brisbane\"},{\"value\":\"Australia/Canberra\",\"label\":\"Australia/Canberra\"},{\"value\":\"Australia/Hobart\",\"label\":\"Australia/Hobart\"},{\"value\":\"Australia/Melbourne\",\"label\":\"Australia/Melbourne\"},{\"value\":\"Australia/Perth\",\"label\":\"Australia/Perth\"},{\"value\":\"Australia/Sydney\",\"label\":\"Australia/Sydney\"}]}','Australia/Melbourne',1,1,'2020-09-15 14:56:44','2020-09-15 14:56:44'),(2,'test_setting1','Test Setting1','number','Test Setting Description','','15',1,1,'2020-09-15 14:56:44','2020-09-15 14:56:44'),(3,'test_setting2','Test Setting2','text','Test Setting Description','','value',1,1,'2020-09-15 14:56:44','2020-09-15 14:56:44'),(4,'twilio_sid','Twilio_SID','text','Twilio SID','','AC27b919bsdfsdfa2d349bfbccf3f0',0,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'twilio_token','Twilio_Token','text','Twilio token','','d4c94170174f345dfsb4203f39e76930e3',0,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,'twilio_phone','Twilio Phone','text','Twilio Phone Number','','+181744496444',0,1,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `auth_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_token_expired_at` int(11) DEFAULT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unconfirmed_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed_at` int(11) DEFAULT NULL,
  `registration_ip` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_login_at` int(11) DEFAULT NULL,
  `last_login_ip` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `blocked_at` int(11) DEFAULT NULL,
  `status` int(2) DEFAULT '10',
  `role` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx-user` (`username`,`auth_key`,`password_hash`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','+324735566120','dVN8fzR_KzJ_lBrymfXI6qyH2QzyXYUU',1600579592,'$2y$13$9Gouh1ZbewVEh4bQIGsifOs8/RWW/7RIs0CAGNd7tapXFm9.WxiXS',NULL,'admin@demo.com','admin@demo.com',1600181804,'127.0.0.1',1600493192,'192.168.0.7',NULL,10,99,1600181804,1600493192),(2,'staff','+32473226120','Xm-zZRREtAIKsFlINVRLSw3U7llbx_5a',1600402161,'$2y$13$TKh5pEy0RFTmkC9Kjvb9A.WR/I1QVzYHdfYDw0m7MnHnN0bsv96Jq',NULL,'staff@demo.com','staff@demo.com',1600181804,'127.0.0.1',1600315761,'192.168.0.7',NULL,10,50,1600181804,1600315761),(4,'user1',NULL,'dO_qyYzUn3tB1QjDge1xs6ap8cB_eCVU',1600402285,'$2y$13$7wchZfk8Cxj2Gd0Hlbh2S.5xfJjFGdTtNuFZMADg93Ni95KNu9xIK',NULL,'user1@usermail.com','user1@usermail.com',1600315849,'192.168.0.7',1600315885,'192.168.0.7',NULL,-1,10,1600315872,1600316060),(5,'leo','+52523225393375','3CaUBLpxCV_1o-ud4eYv4TNDqnh6XqaW',1600577208,'$2y$13$QigS54UhXBqmwBdPMxrng.bCLOqJWbGp9L02ghbtxkoqdoQIDX3hC',NULL,'leo@truecare24.com','leo@truecare24.com',1600316073,'192.168.0.7',1600490808,'192.168.0.7',NULL,10,10,1600316081,1600490808),(6,'test','+123456789','yGJRsIVKWATc7zOc6MoHgkWqqjFmEl4s',NULL,'$2y$13$a83wjph3ZGTV30KTjN.epe/ukYTolwZgQ/OBXeGlNgb0zCUHjlZpG',NULL,'test@gmail.com','test@gmail.com',1600362445,'192.168.0.7',NULL,NULL,NULL,10,10,1600362454,1600448170),(7,'test2','+19999999','ZIsyLJiK-kaca81td9LSKHFTVKuQmv36',NULL,'$2y$13$Wxa6LQoBEAA00KuSuRGJWO357DyCoHNB8JvrJPx8besaN3xA.mnOu',NULL,'test2@gmail.com','test2@gmail.com',1600362445,'192.168.0.1',NULL,NULL,NULL,10,10,1600362680,1600448186);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-19  5:33:08
