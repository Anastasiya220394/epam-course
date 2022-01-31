import { createAutoComplete } from '../auto-complete/index';
import http from 'http';
import url from 'url';
import cities from './cities.json';

const autocomplete = createAutoComplete(cities);

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public');
    res.setHeader('Cache-Control', 'max-age=31536000');
    if (req.url === undefined) return;
    const urlQueries = url.parse(req.url, true);
    const queryNow = urlQueries.query['complete'];

    if (req.method === 'GET'&& queryNow) {
        const answer:string = autocomplete(queryNow);
        res.write(JSON.stringify(answer));
        res.statusCode = 200;
        res.end();
    } else {
        res.statusCode = 404;
        res.end('404');
    }
    
});

server.listen(8000, () => {
    console.log(`Server is running`);
});
