const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('./models/User');
require('./models/Board');
require('./models/List');

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
const boardRoutes = require('./routes/board');
const listRoutes = require('./routes/list')

app.use('/api/auth', authRoutes);
app.use('/api/board',boardRoutes);
app.use('/api/list',listRoutes);




sequelize.authenticate()
    .then(() => {
        console.log('✅ Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err);
    });

// sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('✅ All models were synchronized successfully.');
//     })
//     .catch(err => {
//         console.error('❌ Error synchronizing models:', err);
//     });

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
