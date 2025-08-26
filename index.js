const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = 3001;
const USERS_FILE = './users.json';

app.use(bodyParser.json());

app.use(session({
    secret: '@1234@',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));


function readUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
}


function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    let users = readUsers();

    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    users.push({ username, password }); 
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully.' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    let users = readUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    req.session.user = { username };
    res.json({ message: `Welcome back, ${username}!` });
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Please login to access this resource.' });
    }
    res.json({ message: `Hello, ${req.session.user.username}. Welcome to your dashboard.` });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed.' });
        res.json({ message: 'Logged out successfully.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});