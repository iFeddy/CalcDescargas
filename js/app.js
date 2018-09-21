// Dom7
var $$ = Dom7;

// Plugins
Framework7.use(Framework7Keypad);

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.latirus.calcdescargas', // App bundle ID
  name: 'Calcular Descargas', // App name
  theme: 'md', // Automatic theme detection
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
