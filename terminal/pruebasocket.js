var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/ejecuta.html');
});

io.sockets.on('connection', function (socket) {
  console.log("Conectado!")
});