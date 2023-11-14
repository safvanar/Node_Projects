const fs = require('fs')

const requestHandler = (req,res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
      }
    
      if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        });
    
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];
    
          // Append the new message to the file
          fs.appendFileSync('message.txt', `${message}\n`);
    
          // Redirect to the main page after adding a new message
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      }
}

module.exports = requestHandler

