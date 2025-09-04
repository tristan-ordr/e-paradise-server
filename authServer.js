import 'dotenv/config'
import express from 'express';
import jwt from 'jsonwebtoken'
import getUsersData from "./data/users.js";

const app = express()
const allowedOrigins = [
    'http://localhost:5173'
];

app.use(express.json());

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

let refreshTokens = [] // Note: This should be stored permanently in a database!

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    if (!refreshTokens.includes(refreshToken))  return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter( token => token !== req.body.token);
    res.sendStatus(204)
})

app.post('/login', (req, res) => {
    const username = req.body.username;

    // Authenticate User
    // TODO - learn about user authentication...
    if (authenticateUser(username, req.body.password) === false) return res.sendStatus(401);

    const user = {
        name: username
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    refreshTokens.push(refreshToken)

    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
})

function generateAccessToken(user) {
    const expiresIn = '10m' // Regular use case
    const expiresInDemo = '30s' // For teaching purposes
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expiresIn});
}

function authenticateUser(username, password) {
    const user = getUsersData().find(user => user.username === username);
    if (user == null) return false

    return user.password === password;
}

app.listen(4000);