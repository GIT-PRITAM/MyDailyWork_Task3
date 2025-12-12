import { useLocation, Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';

export default function QuizResults() {
    const { state } = useLocation();
    const { quiz, answers } = state;

    const score = quiz.questions.reduce(
        (acc, q, idx) => acc + (q.correctAnswer === answers[idx] ? 1 : 0),
        0
    );

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #FCE8F1, #F8BBD0)", // pink gradient
                padding: 3,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#C2185B",
                        mb: 1
                    }}
                >
                    Quiz Results
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        color: "#AD1457",
                        fontWeight: 600,
                        mb: 3
                    }}
                >
                    Your Score: {score} / {quiz.questions.length}
                </Typography>

                <Grid container spacing={3}>
                    {quiz.questions.map((q, idx) => (
                        <Grid item xs={12} key={idx}>
                            <Card
                                elevation={6}
                                sx={{
                                    borderRadius: 3,
                                    background: "rgba(255,255,255,0.35)",
                                    backdropFilter: "blur(6px)",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, color: "#880E4F" }}
                                    >
                                        {idx + 1}. {q.questionText}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, color: "#6A1B9A" }}
                                    >
                                        Your Answer: <strong>{answers[idx] || "Not Answered"}</strong>
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#C2185B", fontWeight: 600 }}
                                    >
                                        Correct Answer: <strong>{q.correctAnswer}</strong>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Button
                    component={Link}
                    to="/quizzes"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 4,
                        backgroundColor: "#FF4F79",
                        "&:hover": { backgroundColor: "#E63A65" },
                        color: "#fff",
                        borderRadius: 2,
                        fontWeight: 600,
                        py: 1.2
                    }}
                >
                    Back to Quizzes
                </Button>
            </Container>
        </Box>
    );
}
