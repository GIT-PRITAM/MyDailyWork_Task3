import { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Box,
    IconButton,
    Paper
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;


export default function QuizCreation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);
    const navigate = useNavigate();

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'questionText' || field === 'correctAnswer') {
            newQuestions[index][field] = value;
        } else {
            newQuestions[index].options[field] = value;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () =>
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

    const removeQuestion = (index) =>
        setQuestions(questions.filter((_, i) => i !== index));

    const handleSubmit = async () => {
        try {
            await axios.post(`${API_URL}/api/quizzes`, {
                title,
                description,
                questions
            });
            navigate('/quizzes');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #FCE8F1, #F8BBD0)",
                padding: 4,
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    padding: 4,
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.35)"
                }}
            >
                {/* Back to Quizzes Button */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"

                        onClick={() => navigate('/quizzes')}
                        sx={{
                            borderColor: "#FF4F79",
                            color: "#FF4F79",
                            "&:hover": {
                                borderColor: "#E63A65",
                                color: "#E63A65"
                            }
                        }}
                    >
                        Go to Quizzes
                    </Button>
                </Box>

                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#FF4F79" }}>
                    Create a New Quiz
                </Typography>

                <TextField
                    label="Quiz Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                {questions.map((q, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            padding: 2,
                            my: 3,
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.45)",
                            border: "1px solid #F8BBD0"
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography sx={{ fontWeight: 600, color: "#FF4F79" }}>
                                Question {index + 1}
                            </Typography>

                            <IconButton
                                color="error"
                                onClick={() => removeQuestion(index)}
                                disabled={questions.length === 1}
                            >
                                <RemoveCircle />
                            </IconButton>
                        </Box>

                        <TextField
                            label="Question Text"
                            fullWidth
                            margin="normal"
                            value={q.questionText}
                            onChange={e => handleQuestionChange(index, 'questionText', e.target.value)}
                        />

                        {q.options.map((option, i) => (
                            <TextField
                                key={i}
                                label={`Option ${i + 1}`}
                                fullWidth
                                margin="dense"
                                value={option}
                                onChange={e => handleQuestionChange(index, i, e.target.value)}
                            />
                        ))}

                        <TextField
                            label="Correct Answer"
                            fullWidth
                            margin="dense"
                            value={q.correctAnswer}
                            onChange={e => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                        />
                    </Paper>
                ))}

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddCircle />}
                        sx={{
                            backgroundColor: "#FF4F79",
                            "&:hover": { backgroundColor: "#E63A65" }
                        }}
                        onClick={addQuestion}
                    >
                        Add Question
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#E63A65",
                            "&:hover": { backgroundColor: "#C72E54" }
                        }}
                        onClick={handleSubmit}
                    >
                        Create Quiz
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
