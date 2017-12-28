const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

const app = express();

// for the HTML5 History API
app.use(history({
  rewrites: [
    { from: /^\/api\//, to: '/api/' },
  ]
}));

// enable long-term ( 365 days ) caching of static resources except .html files
app.use(express.static('dist',  {
  maxAge: '365d',
  setHeaders: setCustomCacheControl
}));

// proxy api
app.use('/api/', proxy({
  target: 'https://cnodejs.org/',
  logLevel: 'debug',
  changeOrigin: true
}));

app.listen(3000);

function setCustomCacheControl (res, path) {
  if (express.static.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}
