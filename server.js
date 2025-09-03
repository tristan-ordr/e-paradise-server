// require('dotenv').config()
// const express = require('express')
// const app = express()
// const jwt = require('jsonwebtoken')


import express from "express/lib/express.js";
import jwt from "jsonwebtoken";

import getPlantsData from './data/plants.js'

const app = express();

const allowedOrigins = [
    'http://localhost:5173'
];

app.use(express.json());

app.use((req, res, next) => {

    console.log("RECEIVED REQUEST!")
    console.log("headers:")
    console.log(req.headers);

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