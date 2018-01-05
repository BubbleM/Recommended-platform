
module.exports = app => {
  app.get('/', app.controller.home.home.index);
  app.get('/home', app.controller.home.home.home);
  app.get('/login', app.controller.home.home.login);
  app.get('/register', app.controller.home.home.register);
};
