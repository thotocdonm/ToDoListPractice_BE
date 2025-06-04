const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


sequelize.authenticate()
    .then(() => {
        console.log('✅ Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err);
    });


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
