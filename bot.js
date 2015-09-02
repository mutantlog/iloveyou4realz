var Twit  = require('twit'); // Twitter module
var T = new Twit(require('./config.js')); // Include the configuration file

var stream = T.stream('user')

function favTweet( tweetId ) {
	setTimeout(function() {
		T.post('favorites/create', {id : tweetId}, function (err, data, response) {
		}); 
	}, Math.floor(Math.random() * 120 * 1000));
};

stream.on('tweet', function (tweet) {
	if ((tweet.user.screen_name == "ryanqnorth") && (tweet.entities.user_mentions.length == 0) && (tweet.retweeted === false) && (tweet.favorited === false) && (tweet.in_reply_to_user_id === null) && (tweet.in_reply_to_status_id === null)) {
		favTweet(tweet.id_str);
	}
});
