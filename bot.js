var Twit  = require('twit'); // Twitter module

var T = new Twit(require('./config.js')); // Import Twitter keys

var stream = T.stream('user'); // Open up a stream of your follower's tweets. You need to be following anyone you're going to be replying/faving
// Note: this could use the statuses/filter endpoint and pass a list of userid if you didn't want to follow them.

function favTweet( tweetId ) { // This function does the fav'ing when an appropriate tweet appears
	setTimeout(function() { // This delays the actual fav'ing of the tweet when it appears (see below for more)
		T.post('favorites/create', {id : tweetId}, function (err, data, response) { // Favorite the tweet that has been passed
			if (err) {
				console.log("Guess there was an error: ",err); // Very basic error handling
			}
		}); 
	}, Math.floor(Math.random() * 120 * 1000)); // Delay duration in ms. In this case it's picking a random delay from 0 to 120 sec after the tweet to make it feel less robotic
}

stream.on('tweet', function (tweet) { // Call this every time a tweet is received by the stream
	// This if statement ensures that it's from the user we want to fav, they didn't mention anyone else, it's not a retweet of someone else, it wasn't already fav'ed in the past, and it's not a reply to any tweet
	// This is so the bot is a good citizen and only notifies the user we want to fav and doesn't bother anyone else
	if ((tweet.user.screen_name == "ryanqnorth") && (tweet.entities.user_mentions.length === 0) && (tweet.retweeted === false) && (tweet.favorited === false) && (tweet.in_reply_to_user_id === null) && (tweet.in_reply_to_status_id === null)) {
		favTweet(tweet.id_str); // Call the fav'ing function once we've found an appropriate tweet
	}
});
