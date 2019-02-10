let express = require('express');
let app = express(); 
let bodyParser = require('body-parser');
let session = require('express-session');

//template

app.set('view engine', 'ejs');

//Middleware
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'rototo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(require('./middlewares/flash'));

//Routes 

app.get('/', (req, res) => {

	res.render('pages/index');
});

app.post('/', (req, res) => {
	if(req.body.message === undefined || req.body.message === '') {
		req.flash('error', "Vous n'avez pas entré de message");
		res.redirect('/');
	}
	
});

app.listen(8080);