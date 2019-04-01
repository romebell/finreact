const Twitter = require('twitter');
let express = require('exporess');
let path = require('path');
let app = express();

let server = require('http').Server(app);
let socketIO = require('socket.io')(server);

const port = process.env.PORT || 8000;
server.listen(port);

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});