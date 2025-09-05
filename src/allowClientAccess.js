const allowedOrigins = [
    'http://localhost:5173'
];

export default function allowClientAccess(app) {
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
}