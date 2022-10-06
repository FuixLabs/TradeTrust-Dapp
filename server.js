const express = require('express');
const http = require('http');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 11000;

const server = http.createServer(app);

// proxy all requests to the backend to the backend server
app.use(
  '/document',
  createProxyMiddleware({
    target: process.env.DID_RESOLVER || 'https://resolver-fuixlabs.ap.ngrok.io',
    changeOrigin: true,
  })
);
app.use(
  '/resolver',
  createProxyMiddleware({
    target: process.env.DID_RESOLVER || 'https://resolver-fuixlabs.ap.ngrok.io',
    changeOrigin: true,
  })
);
// ./. proxy all requests to the backend to the backend server

// react client
app.use(
  '/static',
  express.static(__dirname + '/client/build/static', { maxAge: '1y' })
);

function renderPage(_, res) {
  try {
    const indexHtmlPath = __dirname + '/client/build/index.html';
    const indexTemp = fs.readFileSync(indexHtmlPath, 'utf8');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(indexTemp);
  } catch (err) {
    res.sendStatus(404);
  }
}

app.get('*', (req, res, next) => {
  return renderPage(req, res);
});

server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
