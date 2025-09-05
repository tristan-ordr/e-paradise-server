import 'dotenv/config'
import express from 'express';
import jwt from 'jsonwebtoken'

import getPlantsData from './data/plants.js'
import allowClientAccess from "./allowClientAccess.js";

const app = express();

app.use(express.json());

allowClientAccess(app);


app.get('/plants', (req, res) => {
    const plants = getPlantsData()
    res.json(plants)
})

const posts = [
    {
        username: 'Tristan',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    },
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(3000);