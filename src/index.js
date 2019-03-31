const express = require('express');
const bodyParser = require('body-parser');
const morgan =  require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const router = require('./router');
const app = express();



app.use(morgan('dev'));

// body parser for url params and json
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);
app.use(bodyParser.json());

const PORT = 3000;
app.use('/api/v1', router)

// catch all routers
app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the Api'
}));

app.listen(PORT, () =>  {
 console.log('server playing on ' + PORT)
})



module.exports = app;
