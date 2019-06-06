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

  // twitter.get('search/tweets', { q: 'JavaScript', count: 100, locations:'-180,-90,180,90' }, function(err, data, response) {

  //   let tweetArray = [];
  //   for (let index = 0; index < data.statuses.length; index++) {
  //       const tweet = data.statuses[index];
  //       // console.log('this is where I am at');
        
  //       // if (tweet.place != undefined) {
  //         let tweetbody = {
  //           'text': tweet.text,
  //           'userScreenName': "@" + tweet.user.screen_name,
  //           'userImage': tweet.user.profile_image_url_https,
  //           'userDescription': tweet.user.description,
  //         }
  //         try {
  //           if(tweet.entities.media[0].media_url_https) {
  //             tweetbody['image'] = tweet.entities.media[0].media_url_https;
  //           }
  //         } catch(err) { }
  //         tweetArray.push(tweetbody);
  //       // }
  //   }   
  //   // console.log(tweetArray);  
  //   io.emit('allTweet', tweetArray)
  // });

  var stream = twitter.stream('statuses/filter', { q: 'JavaScript', language: 'en', locations:'-180,-90,180,90' })

  stream.on('tweet', function (tweet) {
    // console.log(tweet.tweet);
    // console.log('this is the stream');
    // console.log(tweet.text);
    // if (tweet.tweet != undefined) {
    //   console.log('no real tweet');
    // }
    let tweetbody;
    if (tweet.place != undefined) {
      tweetbody = {
        'text': tweet.text,
        'userScreenName': "@" + tweet.user.screen_name,
        'userImage': tweet.user.profile_image_url_https,
        'userDescription': tweet.user.description,
        'coords': tweet.place.bounding_box.coordinates[0][0]
      };
  
      try {
        if(tweet.entities.media[0].media_url_https) {
          tweetbody['image'] = tweet.entities.media[0].media_url_https;
        }
      } catch(err) { }
    }
    

    
    io.emit('tweet', { 'tweet': tweetbody });
    // setTimeout(() => emit, 10000);
  });
});



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });



