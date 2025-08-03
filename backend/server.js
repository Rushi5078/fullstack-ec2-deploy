const http = require('http');
const hostname = '0.0.0.0'; // Listen on all interfaces
const port = 3000;

const server = http.createServer((req, res) => {
  // Enable CORS for frontend to access backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end('Hello from Backend!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
