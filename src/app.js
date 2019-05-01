const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const controllers = require('./controllers');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/docs', express.static(path.join(__dirname, 'docs')))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(controllers);

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'dist/index.html'));
});

mongoose
  .connect('mongodb://localhost:27017/dolphin', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('mongo connected');
    app.listen(config.get('port') || 3000, () => {
      console.log(`server is listening on port ${config.get('port') || 3000}`);
    });
  })
  .catch(console.log);
