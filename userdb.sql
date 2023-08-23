SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `userdb` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `userdb` (`id`, `name`, `email`, `password`) VALUES
(1, 'Chinmaya Kumar Biswal', 'chinmaya.kumar@ivalue.co.in', '$2a$08$ZFzEQVcXpQ348Yb5rAt7guWgJGB72q.GWA2GFNoP6OxVxTdf2xZuu'),
(2, 'Stephie', 'stephiej305@gmail.com', '$2a$08$GXfJQrID9jntGsaSa2F3IOUNAxQ7fmjC3302NaczGxdnUOXE/gXo6'),
(3, 'Chinmaya Kumar Biswal', 'chinmayakumarbiswal16045@gmail.com', '$2a$08$aYB3weiv6Qol9pphOiADSepSJSHcLRfiLOXTLTkQyHKDj9OXbsh7C'),
(4, 'Chinmaya Kumar Biswal', 'demo@demo', '$2a$08$tMiJefCQOU2xd0mnXp03Puy4DGSEyfF89pG7va0xorYCMAPHHgRe.');



ALTER TABLE `userdb`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `userdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;
