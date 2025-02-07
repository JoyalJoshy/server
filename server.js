const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            console.log(body);
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Received your Message');
        });
        /*req.on('end', ()=> {
            console.log('')
        });*/
    } else {
        res.writeHead(405, {'Content-Type':'text/plain'});
        res.end('Only POST requests are allowed');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server Started");
});