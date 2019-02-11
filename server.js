let express = require('express');
let app = express(); 
let bodyParser = require('body-parser');
let session = require('express-session');


//chargement des templates avec EJS

app.set('view engine', 'ejs');

// Middleware
	//utilisation de 'public'
app.use('/assets', express.static('public'));
	// parse l'url pour 
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
	// page d'accueil
app.get('/', (req, res) => {
  let Message = require('./models/message');
  Message.all(function (messages) {
	 res.render('pages/index', {messages: messages} );
  })
});
	// post les messages dans la db
app.post('/', (req, res) => {
	if(req.body.message === undefined || req.body.message === '') {
		req.flash('error', "Vous n'avez pas entré de message");
		res.redirect('/');
	}
  else {    
    let Message = require('./models/message');

    Message.create(req.body.message, function () {
      req.flash('success', "le message a bien été envoyé");
      res.redirect('/');
    })
  }
	
});

	// affiche juste un message
app.get('/message/:id', (req, res) => {
  let Message = require('./models/message')
  Message.find(req.params.id, function (message) {
    res.render('message/show', {message: message})
  })
})


app.listen(8000);