const Parser = require('rss-parser');
const parser = new Parser();

const Helpers = require('../server/helpers');

const mysql      = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'gila',
  password : 'GIzulofO2016',
  database : 'news'
});

const CATEGORIES = ['main', 'auto', 'games'];

// db.connect();

['https://lenta.ru/rss/news', 'https://news.yandex.ru/auto.rss', 'https://news.yandex.ru/games.rss'].forEach((item, idx) => {
  parse(item, CATEGORIES[idx]);
});

function parse(url, category) {
  (async () => {
      let feed = await parser.parseURL(url);
     
      feed.items.forEach(item => {
        const title = encodeURIComponent(item.title);
        const desc = encodeURIComponent(item.content.replace(/&amp;#39;/g, '\''));
        const url = encodeURIComponent(Helpers.translite(item.title.toLowerCase()));

        db.query(`INSERT INTO news ( id, title, link, description, url ) VALUES ( null, '${decodeURIComponent(title)}', '${item.link}', '${decodeURIComponent(desc)}', '${decodeURIComponent(url)}', '${category}' );`, function (error) {
          if (error) throw error;
        });

      })
  })();
}
