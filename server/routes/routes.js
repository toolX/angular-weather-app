const express = require('express');
const router = express.Router();

const { fetchData } = require('../fetch-data');

router.post('/forecast', (req, res) => {
  fetchData(req.body.formData).then((weather) => {
    res.statusCode(200).send(weather);
  }).catch((e) => {
    console.log(e.message);
  });
});

module.exports = router;
