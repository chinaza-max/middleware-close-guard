
import http from 'http';
import https from 'https';
import url from 'url';

const targetHost = 'api.closeguardtechnology.com';
const targetPath = '/v1/396slbHG7506Rlglhglbfj7';



const server = http.createServer((req, res) => {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Api-Token, Request-Id, Origin');
  
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
  
  
    const parsedUrl = url.parse(req.url);
    const options = {
      hostname: targetHost,
      port: 443,
      path: targetPath + (parsedUrl.pathname.startsWith('/') ? parsedUrl.pathname : `/${parsedUrl.pathname}`),
      method: req.method,
      headers: {
        ...req.headers,
        'Api-Token': '3853925hxnsvdebdyh36s',
        'Request-Id': '123456789',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': targetHost, // Ensure the correct Host header is set
      },
      rejectUnauthorized: false,
    };
  
    delete options.headers['accept-encoding'];
    delete options.headers['connection'];
  
  
    const proxyReq = https.request(options, (proxyRes) => {
      let responseBody = '';
  
      proxyRes.on('data', (chunk) => {
        responseBody += chunk;
      });
  
      proxyRes.on('end', () => {
        console.log('Response from target server:', responseBody);
  
        // Forward the status code and headers from the proxied response
        //res.writeHead(proxyRes.statusCode, proxyRes.headers);

        res.writeHead(proxyRes.statusCode, {
            ...proxyRes.headers,
            'Access-Control-Allow-Origin': '*', // Set your own CORS header
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Api-Token, Request-Id, Origin',
          });
        res.end(responseBody);
      });
    });
  
    proxyReq.on('error', (error) => {
      console.error('Proxy request error:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
  
    req.pipe(proxyReq, { end: true });
  });
  
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Middleware server running on port ${PORT}`);
  });