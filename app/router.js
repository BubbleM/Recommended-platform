
module.exports = app => {
  app.get('/', app.controller.home.home.indexPage);
  app.get('/homePage', app.controller.home.home.homePage);
  app.get('/loginPage', app.controller.home.home.loginPage);
  app.get('/registerPage', app.controller.home.home.registerPage);
  app.get('/showPage', app.controller.home.home.showPage);

  app.get('/submit', app.controller.home.home.submit);
  app.get('/register', app.controller.home.home.register);
  app.get('/login', app.controller.home.home.login);
};
