const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const quizRoutes = require('./routes/quizzes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
