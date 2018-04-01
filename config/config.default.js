const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico')),
    '/public/assets/LOGO': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/iconlogo.png')),
    '/public/assets/banner01': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/banner01.jpg')),
    '/public/assets/banner02': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/banner02.jpg')),
    '/public/assets/banner03': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/banner03.jpg')),
    '/public/assets/attr01': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/attr01.png')),
    '/public/assets/attr02': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/attr02.png')),
    '/public/assets/attr03': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/attr03.png')),
    '/public/assets/attr04': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/attr04.png'))
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];
  exports.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  };
  return exports;
};
