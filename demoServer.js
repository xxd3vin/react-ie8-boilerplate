const path = require('path');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
//const multer = require('multer');
const nunjucks = require('nunjucks');

const app = express();
app.use(compression());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//var upload = multer(); // for parsing multipart/form-data

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use('/', express.static(path.join(__dirname + '/client')));
app.use('/iwebap/js/portalbillquery', express.static(path.join(__dirname + '/patch/replacement/hotwebs/iwebap/js/portalbillquery')));

app.use('/iwebap', express.static(__dirname + '/client/nchome/hotwebs/iwebap'));
app.use(require('./server/routes/fakeNC')());

// Create a mock API with swagger

const SwaggerExpress = require('swagger-express-mw');

const swaggerConfig = {
  appRoot: __dirname,  // required config
  configDir: 'src/swagger',
  swagger: 'src/swagger/swagger.yaml'
};

SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
});

const port = process.env.PORT || 3008;
const ip = process.env.IP || '127.0.0.1';

app.listen(port, ip, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://%s:%s', ip, port);
});
