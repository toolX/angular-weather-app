const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { fetchData } = require('./fetch-data');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.post('/forecast', (req, res) => {
  fetchData(req.body.formData).then((weather) => {
    console.log(weather);
  }).catch((e) => {
    console.log(e.message);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhos ${PORT}`);
});
