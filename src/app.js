var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var { db } = require('./config/database.js');

mongoose.connect(db,{
	//useMongoClient:true
});

require('./config/passport')(passport);

app.set('port', process.env.PORT|| 3000 )
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret: 'secretsession',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () => {
	console.log('Servidor en puerto', app.get('port'));
});