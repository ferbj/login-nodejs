module.exports = (app, passport) => {
	app.get('/', (req,res) => {
		res.render('index');
	});
	app.get('/login', (req,res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});
	app.post('/logged', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/registrar', (req,res) => {
		res.render('register', {
			message: req.flash('regMessage')
		});
	});
	app.post('/register', passport.authenticate('local-reg',{
		successRedirect: '/register',
		failureRedirect: '/registrar',
		failureFlash: true 
	}));

	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
 };
	function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
    }
