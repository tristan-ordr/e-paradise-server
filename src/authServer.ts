import express from 'express';
import jwt from 'jsonwebtoken'
import getUsersData from "#knex/setup/users.js";
import type {User} from "#models/User.js";
import cors from "cors";

const port = 4000;

const app = express()

app.use(
    cors<cors.CorsRequest>(),
    express.json()
);


let refreshTokens: string[] = [] // Note: This should be stored permanently in a database!

app.post('/token', (req, res) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        return res.status(500);
    }

    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    if (!refreshTokens.includes(refreshToken))  return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:any, user:any) => {
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
    if (!process.env.REFRESH_TOKEN_SECRET) {
        return res.status(500);
    }

    const username = req.body.username;

    // Authenticate User
    // TODO - learn about user authentication...
    if (!authenticateUser(username, req.body.password)) return res.sendStatus(401);

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

function generateAccessToken(user: User) {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return null
    }

    const expiresIn = '10m' // Regular use case
    const expiresInDemo = '30s' // For teaching purposes
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expiresIn});
}

function authenticateUser(username: string, password: string) {
    const user = getUsersData().find(user => user.username === username);
    if (user == null) return false

    return user.password === password;
}

app.listen(4000);