-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: kostylo.dk.mysql:3306
-- Generation Time: Dec 01, 2016 at 05:49 PM
-- Server version: 5.5.53-MariaDB-1~wheezy
-- PHP Version: 5.4.45-0+deb7u5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tinderbox`
--
CREATE DATABASE `tinderbox` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tinderbox`;

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE IF NOT EXISTS `area` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`aid`, `aname`) VALUES
(1, 'area A'),
(2, 'area B');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE IF NOT EXISTS `faq` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`fid`, `question`, `answer`) VALUES
(1, 'Can I see my ticket on the phone?', 'Yes you can see it, and you can use it as well to enter'),
(2, 'Can I return my ticket?', 'Once bought, your ticket cannot be returned/refunded');

-- --------------------------------------------------------

--
-- Table structure for table `leader`
--

CREATE TABLE IF NOT EXISTS `leader` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `lname` varchar(80) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `lstatus` enum('active','inactive') DEFAULT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `leader`
--

INSERT INTO `leader` (`lid`, `lname`, `email`, `pass`, `phone`, `lstatus`) VALUES
(1, 'Soren', 'soren@eal.dk', '1234', 11223344, 'active'),
(2, 'Mette', 'mette@eal.dk', '1234', 44332211, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `nid` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`nid`, `author`, `title`, `description`, `picture`) VALUES
(1, 'Admin', 'Martin Garrix ', 'Garritsen learned to play guitar at age 8. In 2004, he expressed interest in becoming a DJ after seeing Tiesto perform at the Olympic games in Athens. He took particular inspiration from the track "Traffic", prompting him to download specialist software, FL Studio, and enabling him to start composing. In 2013, he graduated from the Herman Brood Academy, a production school in Utrecht. Garritsen ghost writes tracks for other artists, and despite this, only one in fifty of his tracks have made it out to the public. In an interview when asked about his social class, Garritsen said middle-class. He also said his ''dream mentor'' was Calvin Harris.', '/source.png'),
(2, 'Admin', 'Become intern', 'As an intern for the North Side and Tinderbox, you become part of a dynamic and dedicated team of employees who work with all aspects of festival development and management.You will get lots of responsibility and opportunity to influence the festival development. Since we have a high work rate and many ongoing projects, it is a necessity that you are enterprising and able to handle tasks independently.We are looking for two communication profiles with either communicative, journalistic, graphic or Social Media skills, which will also carry out the following tasks: Administration of social media like Twitter, Facebook, Instagram, Snapchat etc. Web editing - Constitution of news for web and translation into English and updating  of websites.', '/goo.png');

-- --------------------------------------------------------

--
-- Table structure for table `systemMessage`
--

CREATE TABLE IF NOT EXISTS `systemMessage` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(100) DEFAULT NULL,
  `content` text,
  `lid` int(11) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `lid` (`lid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `systemMessage`
--

INSERT INTO `systemMessage` (`sid`, `topic`, `content`, `lid`) VALUES
(1, 'Working', 'Looking for volunteer for 10 hour shift', 1),
(2, 'Break', 'All can have 2hours brake', 2);

-- --------------------------------------------------------

--
-- Table structure for table `systemMessage_team_bond`
--

CREATE TABLE IF NOT EXISTS `systemMessage_team_bond` (
  `stid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  PRIMARY KEY (`stid`),
  KEY `tid` (`tid`),
  KEY `sid` (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `systemMessage_team_bond`
--

INSERT INTO `systemMessage_team_bond` (`stid`, `tid`, `sid`) VALUES
(1, 1, 2),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `taskid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(80) DEFAULT NULL,
  `description` text,
  `tstart` datetime DEFAULT NULL,
  `tend` datetime DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `lid` int(11) DEFAULT NULL,
  PRIMARY KEY (`taskid`),
  KEY `aid` (`aid`),
  KEY `vid` (`vid`),
  KEY `lid` (`lid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`taskid`, `title`, `description`, `tstart`, `tend`, `aid`, `vid`, `lid`) VALUES
(1, 'Task 1', 'Clean 20 tables', '2016-12-31 13:00:00', '2016-12-31 13:59:59', 1, 1, 1),
(2, 'Task 2', 'Sell 20 cases of beer', '2016-12-31 14:20:00', '2016-12-31 15:00:00', 2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(30) DEFAULT NULL,
  `lid` int(11) DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `lid` (`lid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`tid`, `tname`, `lid`) VALUES
(1, 'Team A', 2),
(2, 'Team B', 2);

-- --------------------------------------------------------

--
-- Table structure for table `team_area_bond`
--

CREATE TABLE IF NOT EXISTS `team_area_bond` (
  `taid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`taid`),
  KEY `tid` (`tid`),
  KEY `aid` (`aid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `team_area_bond`
--

INSERT INTO `team_area_bond` (`taid`, `tid`, `aid`) VALUES
(1, 1, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `tkid` int(11) NOT NULL AUTO_INCREMENT,
  `ttype` varchar(50) DEFAULT NULL,
  `qr` int(11) DEFAULT NULL,
  PRIMARY KEY (`tkid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`tkid`, `ttype`, `qr`) VALUES
(1, '1day', 214665412),
(2, '3day', 214654686);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE IF NOT EXISTS `token` (
  `tokenid` bigint(20) NOT NULL,
  `iat` varchar(255) DEFAULT NULL,
  `iss` varchar(100) DEFAULT NULL,
  `nbf` varchar(255) DEFAULT NULL,
  `expi` varchar(255) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  PRIMARY KEY (`tokenid`),
  KEY `vid` (`vid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`tokenid`, `iat`, `iss`, `nbf`, `expi`, `vid`) VALUES
(12134354345, '11223344', 'john.john@yahoo.com', '11223366', '11223500', 1),
(23213453453, '64423346', 'mia.mia@yahoo.com', '64423800', '64423900', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vol`
--

CREATE TABLE IF NOT EXISTS `vol` (
  `vid` int(11) NOT NULL AUTO_INCREMENT,
  `vname` varchar(80) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `vstatus` enum('active','inactive') DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `tkid` int(11) DEFAULT NULL,
  PRIMARY KEY (`vid`),
  KEY `tid` (`tid`),
  KEY `tkid` (`tkid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `vol`
--

INSERT INTO `vol` (`vid`, `vname`, `email`, `pass`, `phone`, `vstatus`, `tid`, `tkid`) VALUES
(1, 'John', 'john.john@yahoo.com', '1234', 11223344, 'active', 1, 1),
(2, 'Mia', 'mia.mia@yahoo.com', '1234', 44332211, 'active', NULL, NULL),
(3, 'Android', 'an@dro.id', 'easy', 666, 'active', 2, 2),
(4, 'Andrei', 'andreiverdes@yahoo.com', '1234', 1234567890, 'inactive', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
