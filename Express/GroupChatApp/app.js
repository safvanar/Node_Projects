const express = require('express');
const fs = require('fs')

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', (req, res, next) => {
    res.send('<form action="/login" method="POST" onsubmit="localStorage.setItem(\'username\', document.getElementById(\'uname\').value)"><input type="text" name="uname" id="uname" ><button type="submit">Login</button></form>');
});

app.post('/login', (req, res, next) => {
    res.redirect('/chat')
});

app.get('/chat', (req, res, next) => {
    let chats = [];

    // Check if the file exists
    if (fs.existsSync('chats.txt')) {
        // Read contents of the chats.txt file
        chats = fs.readFileSync('chats.txt', 'utf8').split('\n').filter(Boolean);
    }

    // Create an HTML string to display chats
    let chatHTML = '<h2>Chat History</h2>';
    chatHTML += '<div>';
    if (chats.length === 0) {
        chatHTML += '<p>No chat history available.</p>';
    } else {
        for (const chat of chats) {
            const [username, message] = chat.split(':');
            chatHTML += `<p><strong>${username}:</strong> ${message}</p>`;
        }
    }
    chatHTML += '</div>';

    // Add the message input form
    chatHTML += '<form action="/chat" method="POST" onsubmit="document.getElementById(\'uname\').value=localStorage.getItem(\'username\')">';
    chatHTML += '<input type="text" name="msg" id="msg">';
    chatHTML += '<input type="hidden" name="uname" id="uname">';
    chatHTML += '<button type="submit">Send</button>';
    chatHTML += '</form>';

    res.send(chatHTML);
});

app.post('/chat', (req, res, next) => {
    const uname = req.body.uname
    const msg = req.body.msg
    fs.appendFileSync('chats.txt',`${uname}:${msg}\n`)
    res.redirect('/chat')
});

app.use((req, res, next) => {
    res.redirect('/login');
});

app.listen(3000);