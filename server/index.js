const express = require('express');
const app = express();
const router = require('./router/')(app);
const path = require('path');
const cors = require('cors')

app.use(cors());

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
