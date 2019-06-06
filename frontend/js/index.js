let socket = io();
let tweetArray = [];
let index = 0;

  socket.on('tweet', function (tweet) {
    console.log('connected inside tweet');
    if (tweet.tweet.place != undefined) {
      let tweetbody = {
        'text': tweet.tweet.text,
        'userScreenName': "@" + tweet.tweet.user.screen_name,
        'userImage': tweet.tweet.user.profile_image_url_https,
        'userDescription': tweet.tweet.user.description,
        'coords': tweet.tweet.place.bounding_box.coordinates[0][0],
      }
      try {
        if (tweet.tweet.entities.media[0].media_url_https) {
          tweetbody['image'] = tweet.tweet.entities.media[0].media_url_https;
        }
      } catch (err) { }
      tweetArray.unshift(tweetbody);
    }
    socket.emit('allTweet', tweetArray)
}); 

socket.on('tweet', function (tweet) {
  //console.log(tweet);
    tweetArray = tweet;
    //console.log(tweetArray);
    loopArray();
    window.tweetArray = tweetArray;
    // console.log(tweetArray);
    socket.emit('tweet', tweetArray);
});

function loopArray() {
  if (tweetArray.length > index) {
    let currentTweet = tweetArray[index];
    let tweetContent = $('ul.tweets');
    console.log(currentTweet);
    index++;

    let screenName = '<div id="name">' + currentTweet.userScreenName + '</div>';
    let username = '<div id="username">' + '@' + currentTweet.userScreenName + '</div>';
    let userImage = `<img id="prof-pic" src="${currentTweet.userImage}"/>`;

    //  console.log(screenName);

    tweetContent.prepend(
      '<li>' 
        + '<div id="prof-info">' 
          + userImage 
          + '<div id="prof-names">' 
            + screenName 
            + username 
          + '</div>' 
        + '</div>' + currentTweet.text + 
      '</li>');
    
  } else {
    index = 0;
  }
  setTimeout(loopArray, 1000);
}