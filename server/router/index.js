module.exports = function(app) {
  const path = require('path');
  const exphbs  = require('express-handlebars');

  const i18next = require("i18next");
  const i18nextMiddleware = require('i18next-express-middleware');
  const Backend = require('i18next-node-fs-backend');

  const Helpers = require('../helpers');

  const mysql      = require('mysql');
  const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'gila',
    password : 'GIzulofO2016',
    database : 'news'
  });


  const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
      grouped_each: Helpers.grouped_each
    }
  });

  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
        addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
      },
      fallbackLng: 'en',
      preload: ['en', 'ru'],
      saveMissing: true
  });

  //set handlebars
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(i18nextMiddleware.handle(i18next));

  db.connect();


  // MAIN PAGE
  app.get('/', (req, res) => {
    const lang = req.headers["accept-language"].substr(0,2);

    res.cookie('lang', lang) ;

    db.query(`SELECT * FROM news;`, (error, results) => {
      res.render('index', {list: results});
  
      if (error) throw error;
    });
  });

  // NEWS PAGE
  app.get('/news/:url', (req, res) => {
    const url = req.params.url;

    db.query(`SELECT * FROM news WHERE url='${url}';`, (error, results) => {
      console.log(results[0]);
      res.render('news', {results: results[0]});
  
      if (error) throw error;
    });
	});
};