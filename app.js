const Twitter = require('twitter');
let express = require('express');
let path = require('path');
let app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 8000;
server.listen(port);

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

let twitter = new Twitter({
  "consumer_key": process.env.TWITTER_CONSUMER_KEY,
  "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
  "access_tokrn_key": process.env.TWITTER_ACCESS_TOKEN,
  "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let currentStream = null;

io.on('connection', function(socket) {
  console.log('Connected!');
  socket.on('disconnect', () => console.log('Disconnected'));
  socket.on('start tweets', function() {
    if (currentStream === null) {
      
      twitter.stream('statuses/filter', {})
    }
  })
})