const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/routes');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../dist/weather-app')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/weather-app/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on localhos ${PORT}`);
});
