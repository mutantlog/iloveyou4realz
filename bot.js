var Twit  = require('twit'); // Twitter module
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var T = new Twit({ 
	consumer_key		: process.env.ILOVEYOU4REALZ_TWIT_CONSUMER_KEY,
	consumer_secret		: process.env.ILOVEYOU4REALZ_TWIT_CONSUMER_SECRET,
	access_token		: process.env.ILOVEYOU4REALZ_TWIT_ACCESS_TOKEN,
	access_token_secret	: process.env.ILOVEYOU4REALZ_TWIT_ACCESS_TOKEN_SECRET
});


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
