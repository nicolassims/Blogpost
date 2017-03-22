"use strict";
const DATA_HANDLER = require('./node/DataHandler');
class app {
    constructor() {
        this.ejsData = null;
        this.user = null;
        this.loadServer();
    }

    loadServer() {
        const HTTP = require('http');
        const PORT = 8000;
        const EJS = require('ejs');

        HTTP.createServer((request, response) => {
            let httpHandler = (error, string, contentType) => {
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('An error has occurred: ' + error.message);
                } else if (contentType.indexOf('css') >= 0 || contentType.indexOf('js') >= 0) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'utf-8');
                } else if (contentType.indexOf('html') >= 0) {
                    console.log(`Rendering EJS`);
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(EJS.render(string, {
                        data: this.ejsData,
                        filename: 'index.ejs'
                    }));
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'binary');
                }
            };
            if (request.url.indexOf('.css') >= 0) {
                this.render(request.url.slice(1), 'text/css', httpHandler, 'utf-8');
            } else if (request.url.indexOf('.js') >= 0) {
                this.render(request.url.slice(1), 'application/javascript', httpHandler, 'utf-8');
            } else if (request.url.indexOf('.png') >= 0) {
                this.render(request.url.slice(1), 'image/png', httpHandler, 'binary');
            } else if (request.url.indexOf('/') >= 0) {
                this.render('public/views/index.ejs', 'text/html', httpHandler, 'utf-8');
            } else {
                this.render(`HEY! What you're looking for: It's not here!`, 'text/html', httpHandler, 'utf-8');
            }

        }).listen(PORT);
    }
    render(path, contentType, callback, encoding) {
        const FS = require('fs');
        FS.readFile(path, encoding ? encoding : 'utf-8', (error, string) => {
            callback(error, string, contentType);
        });
    }
}
module.exports = app;