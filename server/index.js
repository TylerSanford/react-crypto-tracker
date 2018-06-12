const express = require('express');
const path = require('path');
const index = require('./routes/index');
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(index);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function() {
  console.error(
    `Node cluster worker ${process.pid}: listening on port ${PORT}`
  );
});
