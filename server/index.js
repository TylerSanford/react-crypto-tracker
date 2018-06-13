const express = require('express');
const path = require('path');
const index = require('./routes/index');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// app.use(
//   cors({
//     credentials: true,
//     origin: [process.env.CLIENT_URL || CLIENT_URL],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// );

//CORS bypass
app.use(function(req, res, next) {
  //must be included these first two
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  next();
});
app.use(index);

io.on('connection', socket => {
  console.log('New client connected'),
    setInterval(() => getBtcRate(socket), 3000);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const getBtcRate = async socket => {
  try {
    const res = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD'
    );
    socket.emit('FromAPI', res.data.USD);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// // All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     // Serve static files from the React app
//     app.use(express.static(path.join(__dirname, 'client/build')));

//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
//   });
// }

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
