const Twit = require('twit');
// const Twitter = require('twitter');
const config = require('../../config/twitter_credentials');
console.log('lets goooooooooooooooooooo');

const twitter = new Twit(config);
// const twitter = new Twitter(config);

let params = {
  q: 'javascript',
  count: 25
}

// Search data
twitter.get('search/tweets', params, searchedData);

function searchedData(err, data, response) {
  if(err) console.log(err);
  tweets = data.statuses;
  
  for(let i = 0; i < tweets.length; i++) {
    let tweet = tweets[i].text;
    console.log(tweet);
    console.log('======================')
  }

  // console.log(data.statuses[0].text);
  // console.log('=====================================')
  // console.log(data.statuses[1].text);
  // console.log(response);
}

let sanFrancisco = ['-122.75', '36.8', '-121.75', '37.8'];
let stream = twitter.stream('statuses/filter', { locations: sanFrancisco });

stream.on('tweet', function (tweet) {
  console.log(tweet.text);
  console.log(tweet.user.location);
  console.log('===============================');
});
