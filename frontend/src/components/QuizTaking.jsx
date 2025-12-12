import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Box,
    Paper
} from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL;

export default function QuizTaking() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/quizzes/${id}`).then(res => setQuiz(res.data));
    }, [id]);

    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < quiz.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            navigate('/results', { state: { quiz, answers } });
        }
    };

    if (!quiz) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    const question = quiz.questions[currentQuestion];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #FCE8F1, #F8BBD0)",
                padding: 3,
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={8}
                    sx={{
                        padding: 4,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.35)",
                        backdropFilter: "blur(6px)"
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            color: "#C2185B",
                            mb: 1
                        }}
                    >
                        {quiz.title}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            color: "#AD1457",
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "#880E4F",
                            mb: 2
                        }}
                    >
                        {question.questionText}
                    </Typography>

                    <RadioGroup
                        value={answers[currentQuestion] || ''}
                        onChange={e => handleAnswer(e.target.value)}
                        sx={{ ml: 1 }}
                    >
                        {question.options.map((opt, i) => (
                            <FormControlLabel
                                key={i}
                                value={opt}
                                control={
                                    <Radio
                                        sx={{
                                            color: "#FF4F79",
                                            "&.Mui-checked": {
                                                color: "#E63A65"
                                            }
                                        }}
                                    />
                                }
                                label={opt}
                                sx={{ color: "#6A1B9A", mb: 1 }}
                            />
                        ))}
                    </RadioGroup>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Button
                            variant="contained"
                            onClick={nextQuestion}
                            sx={{
                                backgroundColor: "#FF4F79",
                                "&:hover": { backgroundColor: "#E63A65" },
                                color: "#fff",
                                borderRadius: 2,
                                px: 4,
                                py: 1.2,
                                fontWeight: 600
                            }}
                        >
                            {currentQuestion + 1 < quiz.questions.length ? "Next" : "Submit"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
