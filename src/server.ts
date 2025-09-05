import express from 'express';
import jwt from 'jsonwebtoken'


const app = express();

app.use(express.json());

const allowClientAccess = (app: any) => {
    // app.use((req, res, next) => {
    //     const origin = req.headers.origin;
    //
    //     if (allowedOrigins.includes(origin)) {
    //         res.header('Access-Control-Allow-Origin', origin);
    //     }
    //
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //
    //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //
    //     if (req.method === 'OPTIONS') {
    //         return res.status(200).end();
    //     }
    //
    //     next();
    // });
};
allowClientAccess(app);

app.get('/plants', (req, res) => {
    // const plants = getPlantsData()
    // res.json(plants)
})

// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name));
// })


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);
//
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
//
// }

const port = process.env.PORT || "9001"
app.listen( port, () => {
    console.log(`Example app listening on port ${port}`);
});