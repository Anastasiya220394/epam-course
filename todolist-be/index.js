const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use('/todos', require('./routes/routes'));
const PORT = config.get('port') || 5000;
async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {});
        app.listen(PORT, () => console.log(`starting on port ${PORT}`));
    }
    catch (e) {
        console.log('Server error', e.message);
        process.exit();
    }
}
start();
