const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const PORT = 7000;

const server = http.createServer((req, res) => {

    if (req.method == 'POST') {
        let decoder = new StringDecoder('utf-8');
        let stringData = '';
        res.setHeader("Content-type", "application/json");
        req.on('data', data => {
            stringData += decoder.write(data);
        });

        req.on('end', () => {
            res.write(JSON.stringify({"payload": stringData}));
            res.end();
        });

    } else if (req.method == "GET") {
        let urlPath = url.parse(req.url, true);
        console.log(`${req.method} - ${urlPath.pathname}`);
        res.write(req.url);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});
