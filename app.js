const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Twitter = require('twit');
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
const config = require('./config/twitter_credentials');

app.use(express.static('frontend'));

const twitter = new Twitter(config);

function wait(ms) {
  let date = new Date();
  let d2 = null;
  do { 
    d2 = new Date(); 
    // console.log(date, d2);
  }
  while(d2 - date < ms);
}

io.on('connect', function(socket) {
  
  var stream = twitter.stream('statuses/filter', { q: 'JavaScript', language: 'en', locations:'-180,-90,180,90' });
  
  
  stream.on('tweet', function (tweet) {
    // console.log('=========== Beginning =================');
    // console.log(tweet.user.name);
    // console.log('=========== End =================');

    wait(500);
    // console.log('test');
    let tweetbody;
    if (tweet.place != undefined) {
      tweetbody = {
        'text': tweet.text,
        'name': tweet.user.name,
        'userScreenName': "@" + tweet.user.screen_name,
        'userImage': tweet.user.profile_image_url_https,
        'userDescription': tweet.user.description,
        'coords': tweet.place.bounding_box.coordinates[0][0]
      };
      
      try {
        if(tweet.entities.media[0].media_url_https) {
          // console.log(tweet.entities.media[0].media_url_https);
        
          tweetbody['image'] = tweet.entities.media[0].media_url_https;
        }
      } catch(err) { }
    }
    
    io.emit('tweet', { 'tweet': tweetbody });
  });
});


