const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
    // Get the file path from the request URL
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // File not found
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
        } else {
            // Determine Content-Type based on file extension
            let contentType = 'text/html';
            const ext = path.extname(filePath);
            switch (ext) {
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.jpg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
            }
            
            // Serve the file with appropriate Content-Type
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
