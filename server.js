const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/domi-front-end/'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + `/dist/domi-front-end/index.html`));
});

var port = process.env.PORT || 3000;

app.listen(port, process.env.IP || "0.0.0.0", function () {
  console.log("Server listening on " + port);
});