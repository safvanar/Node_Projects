const express = require('express');

const fs = require('fs')

const bodyParser = require('body-parser');

const app = express(); 

app.use(bodyParser.urlencoded({extended:false}))

app.get('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem("username", document.getElementById("uname").value)" action="/login" method="POST"><input type="text" name="uname"><br><button type="submit">Login</button></form>');
});

app.post('/login', (req, res, next) => {
    const username = req.body.uname;

    // Set username in localStorage and redirect to chat page
    // Replace client-side redirection with server-side redirection
    res.redirect(`/chat?username=${encodeURIComponent(username)}`);
});

app.get('/chat', (req, res, next) => {
    const username = req.query.username;

    if (!username) {
        // Redirect to login if username is not set
        res.redirect('/login');
    } else {
        // Display chat form with username and chat content
        res.send(`
            <form action="/chat" method="POST">
                <input type="text" name="msg"><br>
                <button type="submit">Send</button>
            </form>
            <div>
                <p>Welcome, ${username}!</p>
                <div id="chat-content">${getChatContent()}</div>
            </div>
        `);
    }
});

app.post('/chat', (req, res, next) => {
    const username = req.query.username; // Retrieve username from query parameter
    const message = req.body.msg;

    if (username && message) {
        // Append username: message to a file
        fs.appendFileSync('chatlog.txt', `${username}: ${message}\n`);
    }

    // Redirect to chat page with username as a query parameter
    res.redirect(`/chat?username=${username}`);
});

// Helper function to read chat content from file
function getChatContent() {
    try {
        return fs.readFileSync('chatlog.txt', 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Handle case where the file doesn't exist
            console.error('Chat log file not found.');
            return '';
        }
        console.error('Error reading chat log file:', error.message);
        return '';
    }
}



app.use((req,res,next) => {
    res.status(404).send('<h1>Page not found!</h1>')
})


app.listen(3000);