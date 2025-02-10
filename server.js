const http = require('http');
const commander = require('./commands');
const tools = require('./tools');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            var contents = tools.decodeData(body);
            var datas = contents.slice(1);
            console.log(contents);
            res.writeHead(200, {'Content-Type':'text/plain'});
            commander.runCommand(contents[0], datas).then(result => {
                res.end(result);
            });
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
