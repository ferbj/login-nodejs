var local = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('local-reg', new local({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		User.findOne({'local.email':email}, function (err, user){
			if(err) {return done(err);}
			if(user) {
				return done(null, false, req.flash('regMessage','El correo ya existe'));
			} else {
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				newUser.save(function (err){
					if(err) {throw err;}
					return done(null, newUser);
				});
			}
		})
	}
	));

	passport.use('local-login', new local({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		User.findOne({'local.email':email}, function (err, user){
			if(err) {return done(err);}
			if(!user) {
				return done(null, false, req.flash('loginMessage', 'El usuario no se ha encontrado'));
			}
			if(!user.validatePassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Error en password'));
			}
			return done(null, user);
		});
	 }));
}