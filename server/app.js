// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// webpack-dev-middleware
if (process.env.NO_DEV !== 1) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);
  const middleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(middleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// Get Index
app.get('/index', (req, res) => {
  fetch('https://rugby-board.herokuapp.com/api/v1/index').then(function (response){
    return response.json();
  }).then(function (json){
    res.send(json);
  });
});

// Get News Item
app.get('/news/:id', (req, res) => {
  fetch('https://rugby-board.herokuapp.com/api/v1/news/' + req.params.id).then(function (response){
    return response.json();
  }).then(function (json){
    res.send(json);
  });
});

// Get News List
app.get('/list', (req, res) => {
  const channel = req.query.channel || -1;
  const event = req.query.event || -1;
  let page = req.query.page || 1;
  if (page < 1) {
    page = 1;
  }
  let url = 'https://rugby-board.herokuapp.com/api/v1/list';
  const params = new Array();
  params.push('p=' + page);
  if (channel !== -1) {
    params.push('channel=' + channel);
  }
  if (event !== -1) {
    params.push('event=' + event);
  }
  if (channel !== -1 || event !== -1) {
    url += ('?' + params.join('&'));
  }
  fetch(url).then(function (response){
    return response.json();
  }).then(function (json){
    res.send(json);
  });
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
