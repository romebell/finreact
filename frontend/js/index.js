let socket = io();
let tweetArray = [];
let index = 0;

socket.on('tweet', function (tweet) {
  
  // console.log('connected inside of tweet');
    
    let currentTweet = tweet.tweet;
    console.log(currentTweet);
    
    let tweetContent = $('ul.tweets');
    let screenName = '<div id="name">' + currentTweet.name + '</div>';
    let username = '<div id="username">' + currentTweet.userScreenName + '</div>';
    let userImage = `<img id="prof-pic" src="${currentTweet.userImage}"/>`;


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
    socket.emit('tweetArray', tweetArray);
});