require('dotenv').config()
const path = require('path');
const express = require('express');
const appName = process.env.APPNAME
const PORT = process.env.PORT;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    }

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use('/api/forge/oauth', require('./routes/oauth'));
app.use('/api/forge/oss', require('./routes/oss'));
//app.use('/api/forge/modelderivative', require('./routes/modelderivative'));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode).json(err);
});
app.listen(PORT, () => { console.log(`The app ${appName} is working! Server listening on port ${PORT}`); });
