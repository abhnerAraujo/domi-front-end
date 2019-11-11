//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/domi-front-end'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/domi-front-end/index.html'));
});

// Start the app by listening on the default Heroku port
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

app.listen(port, host, function () {
  console.log("Server started.......");
});