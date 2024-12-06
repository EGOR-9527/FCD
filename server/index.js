// src/index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const todoRoutes = require('./router');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Разрешите только ваш фронтенд
    credentials: true, // Разрешите использование куки
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/todos', todoRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});