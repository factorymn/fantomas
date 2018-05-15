/* eslint-disable */
var express = require('express');
var webpack = require('webpack');
var path = require('path');
var router = express.Router();
var webpackConfig = require('./webpack/webpack.dev.config.js');
var fs = require('fs');
var bodyParser = require('body-parser');
var _get = require('lodash/get');


var localIp = webpackConfig.localIp;
var localPort = webpackConfig.localPort;


delete webpackConfig.localIp;
delete webpackConfig.localPort;

const compiler = webpack(webpackConfig);

let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/models', function(req, res) {
  fs.writeFile("./bd/models.json", JSON.stringify(req.body, null, 2), function(err) {
    if(err) {
      res.send({ status: 0, error: 'Can`t write file models' });
    }
    res.send({ status: 1 });
  });
});

app.get('/models', function(req, res) {
  fs.readFile('./bd/models.json', 'utf8', function(err, contents) {
    const models = contents ? _get(JSON.parse(contents), 'models') : {};
    res.send({ status: 1, models });
  });
});

app.use(express.static(path.join(__dirname, '/assets')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use((req, res) => {
  res.status(200).sendFile(__dirname + '/index.html')
});

app.listen(localPort, () => {
  console.info(`==> Open up http://${ localIp }:${ localPort }/ in your browser.`)
});
