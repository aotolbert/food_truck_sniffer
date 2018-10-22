

USE foodtrucks_db;
SELECT * FROM FoodTrucks;



USE foodtrucks_db;

INSERT INTO `FoodTrucks` (`id`,`name`,`url`,`address`,`thumbnail`,`image`,`twitterId`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'Cuzzo\'s Cuisine','https://cuzzoscuisine.com/','3418 Tuckaseegee Rd, Charlotte NC ','https://pbs.twimg.com/profile_images/803637341101420544/VQMHJGhG_400x400.jpg','https://pbs.twimg.com/profile_images/803637341101420544/VQMHJGhG_400x400.jpg','@CuzzosCuisine','2018-10-17 00:19:00','2018-10-17 00:19:00');

INSERT INTO `FoodTrucks` (`id`,`name`,`url`,`address`,`thumbnail`,`image`,`twitterId`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'Fresh Med','http://www.freshmedclt.com/','1000 music factory blvd','https://pbs.twimg.com/profile_images/720312599292850176/8vL94FYv_400x400.jpg','https://pbs.twimg.com/profile_images/720312599292850176/8vL94FYv_400x400.jpg','@freshmedclt','2018-10-16 23:19:37','2018-10-16 23:19:37');

INSERT INTO `FoodTrucks` (`id`,`name`,`url`,`address`,`thumbnail`,`image`,`twitterId`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'Rico\'s Acai','http://www.ricosacai.com/','510 S College St','https://s3-media2.fl.yelpcdn.com/bphoto/pPOfOsqIm49TBObymsVMUw/o.jpg','https://s3-media2.fl.yelpcdn.com/bphoto/pPOfOsqIm49TBObymsVMUw/o.jpg','@r_acai','2018-10-19 20:19:37','2018-10-19 20:19:37');



INSERT INTO `YelpReviews` (`id`,`rating`,`username`,`profileUrl`,`imageUrl`,`content`,`contentURL`,`contentTimeCreated`,`createdAt`,`updatedAt`,`FoodTruckId`) VALUES (DEFAULT,5,'Ella A.','https://www.yelp.com/user_details?userid=zjcL4_QUOwACJjorewuz7w','https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg','Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...','https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w','2016-08-29 00:41:13','2018-10-17 05:20:14','2018-10-17 05:20:14',1);
INSERT INTO `YelpReviews` (`id`,`rating`,`username`,`profileUrl`,`imageUrl`,`content`,`contentURL`,`contentTimeCreated`,`createdAt`,`updatedAt`,`FoodTruckId`) VALUES (DEFAULT,5,'Ella A.','https://www.yelp.com/user_details?userid=zjcL4_QUOwACJjorewuz7w','https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg','This place suuuucks. Got food poisoning twice and my dog died after eating some of the leftovers off my counter. 2/5 stars.','https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w','2016-08-29 00:41:13','2018-10-17 05:20:14','2018-10-17 05:20:14',2);
