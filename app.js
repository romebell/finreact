const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Twitter = require('twit');
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
const config = require('./config/twitter_credentials');

// const port = process.env.PORT || 8000;



// server.listen(port, function() {
//   console.log(`listening on port *: ${port}`);
// });

app.use(express.static('frontend'));

// const twitter = new Twitter({
//   consumer_key: 'J7IkFcnxXqBZKC8tWvPiB1ZdQ',
//   consumer_secret: '3gLzWzdm6CwImEU2ysGoxOtMgbBV50z6EmGD009RtThJgZ58DT',
//   access_token: '163672728-rko53wdRKByBQGfiUXZz1LXG9PJBETdHIcFpZF09',
//   access_token_secret: 'fFY2t1WUUjTUYRQwhBiWIXEZeGDajo8fgvi9Bw5xZ1XBL',
//   // timeout_ms: 1000
//   timeout_ms:           5*1000,  // optional HTTP requßest timeout to apply to all requests.
// });

const twitter = new Twitter(config);

io.on('connect', function(socket) {

  twitter.get('search/tweets', { q: '#javascript', count: 1000 }, function(err, data, response) {
    // console.log(data.coordinates);
    // console.log(data.coordinates);

    var tweetArray=[];
      for (let index = 0; index < data.statuses.length; index++) {
          const tweet = data.statuses[index];
          // if (tweet.place === null) continue;
          var tweetbody = {
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

// listening for requests.


// var tweet = {
//   "name": data.user.name,
//   "username": data.user.screen_name,
//   "profile_pic": data.user.profile_image_url_https,
//   "text": data.text,
//   "hashtags": data.entities.hashtags,
//   "lat": data.coordinates.coordinates[0],
//   "lng": data.coordinates.coordinates[1]
// };



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });

// var twitter = new Twitter({
//   "consumer_key": process.env.TWITTER_CONSUMER_KEY,
//   "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
//   "access_token_key": process.env.TWITTER_ACCESS_TOKEN,
//   "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });


// const twitter = new Twitter(config);

// let currentStream = null;

// io.on('connection', function(socket) {
//   console.log('Connected!');
//   // socket.on('disconnect', () => console.log('Disconnected'));
//   socket.on('start tweets', function() {
//     console.log('inside on func')
//     if (currentStream === null) {

//         twitter.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream){
//           console.log('inside stream func')
//           currentStream = stream;
//           console.log(currentStream)
//           currentStream.on('data', function(data) {
//             console.log('inside next on')
//             if (data.coordinates) {
//               if (data.coordinates !== null) {
                // var tweet = {
                //   "name": data.user.name,
                //   "username": data.user.screen_name,
                //   "profile_pic": data.user.profile_image_url_https,
                //   "text": data.text,
                //   "hashtags": data.entities.hashtags,
                //   "lat": data.coordinates.coordinates[0],
                //   "lng": data.coordinates.coordinates[1]
                // };
//                 socket.broadcast.emit("twitter-stream", tweet);
//                 socket.emit('twitter-stream', tweet);
//               }
//             }
//           });
//         });
//     }
//   });
//   socket.emit('connected');
// });


