
const express = require('express');
const preferencesRoutes = require('./routes/preferences');

const app = express();
app.use(express.json());

const DEBUG = process.env.DEBUG || false;
if (DEBUG)
    console.log("Debug enabled");

app.use((req, res, next) => {
    const clientIP = req.ip;

    if (DEBUG || clientIP === '::ffff:127.0.0.1' || clientIP === '::1') {
        next();
    } else {
        res.status(403).json({ message: 'Access forbidden: your IP is not allowed.' });
    }
});

app.use('/api/cs2f_userpreference', preferencesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
