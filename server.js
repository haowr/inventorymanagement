const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const config = require('./config/database');
const passport = require('passport');
//const compression = require('compression');


// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});


const app = express();
//app.user(compression());
app.use(cors());

app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//Routes file 
app.use('/routes',routes);
app.get('*', (req,res)=>{

    res.sendFile(path.join(__dirname, 'dist/index.html'));



})

const port = process.env.PORT || '3000';
const server = http.createServer(app);
server.listen(port,()=> console.log('Server running at port: '+port));
