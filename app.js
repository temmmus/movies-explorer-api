const express = require('express');
const process = require('process');

const { PORT = 4000 } = process.env;
const app = express();

app.listen(PORT, () => {
    console.log('Поехали!');
  });
  