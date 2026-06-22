
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.JPG': 'image/jpeg',
  '.JPEG': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './invitacion-boda.html';
  }

  const extname = String(path.extname(filePath));
  const contentType = mimeTypes[extname] || mimeTypes[extname.toLowerCase()] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.error('Error loading file:', filePath, error.code);
      if(error.code == 'ENOENT'){
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found: ' + filePath, 'utf-8');
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
      }
    }
    else {
      console.log('Serving:', filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
