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

io.on('connect', function(socket) {

  twitter.get('search/tweets', { q: '#javascript', count: 1000 }, function(err, data, response) {

    var tweetArray=[];
      for (let index = 0; index < data.statuses.length; index++) {
          const tweet = data.statuses[index];
          let tweetbody = {
            'text': tweet.text,
            'userScreenName': "@" + tweet.user.screen_name,
            'userImage': tweet.user.profile_image_url_https,
            'userDescription': tweet.user.description,
          }
          try {
            if(tweet.entities.media[0].media_url_https) {
              tweetbody['image'] = tweet.entities.media[0].media_url_https;
            }
          } catch(err) { }
          tweetArray.push(tweetbody);
      }     
      io.emit('allTweet',tweetArray)
  })

  var stream = twitter.stream('statuses/filter', { track: '#javascript', language: 'en', locations:'-180,-90,180,90' })

  stream.on('tweet', function (tweet) {
      io.emit('tweet',{ 'tweet': tweet });
  })
});



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });



