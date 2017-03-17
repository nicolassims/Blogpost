// todo:

"use strict";

class app {
    constructor() {
        this.loadServer();
    }

    loadServer() {
        const HTTP = require('http');
        const PORT = 8000;

        HTTP.createServer((request, response) => {

            let httpHandler = (error, string, contentType) => {
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('An error has occurred: ' + error.message);
                } else if (contentType.indexOf('css') >= 0 || contentType.indexOf('html') >= 0 || contentType.indexOf('js') >= 0) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'utf-8');
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'binary');
                }
            };

            if (request.url.indexOf('.css') >= 0) {

            } else if (request.url.indexOf('.js') >= 0) {

            } else if (request.url.indexOf('.html') >= 0) {

            } else if (request.url.indexOf('.png') >= 0) {

            } else {

            }

        }).listen(PORT);

        render(path, contentType, callback, encoding) {
            const FS = require('fs');
            FS.readFile(path, encoding ? encoding : 'utf-8', (error, string) => {
                callback(error, string, contentType);
            });
        }
    }
}

module.exports = app;