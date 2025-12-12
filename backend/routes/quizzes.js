const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a quiz
router.post('/', async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.json(quiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single quiz
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
