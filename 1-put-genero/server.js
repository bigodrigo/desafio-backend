const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'PUT') {
    if (req.url === '/genres/1') {
      console.log('You updated your gender to female. If this value is incorrect, please use the same route with ID 2 for male and ID 3 for non-binary!');
    } else if (req.url === '/genres/2') {
      console.log('You updated your gender to male. If this value is incorrect, please use the same route with ID 1 for female and ID 3 for non-binary!');
    } else if (req.url === '/genres/3') {
      console.log('You updated your gender to non-binary. If this value is incorrect, please use the same route with ID 1 for female and ID 2 for male!');
    }
    
    res.statusCode = 200;
    res.end('PUT request received');
  } else if (req.url === '/') {
    res.statusCode = 200;
    res.end('Home page!');
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
