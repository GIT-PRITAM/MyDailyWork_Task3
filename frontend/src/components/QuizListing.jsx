import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


export default function QuizListing() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/quizzes`).then(res => setQuizzes(res.data));
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #FCE8F1, #F8BBD0)",
                padding: 3,
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
                        mb: 2
                    }}
                >
                    Available Quizzes
                </Typography>

                {/* Create Quiz Button */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Button
                        component={Link}
                        to="/create-quiz"
                        variant="contained"
                        sx={{
                            backgroundColor: "#FF4F79",
                            "&:hover": { backgroundColor: "#E63A65" },
                            color: "#fff",
                            borderRadius: 2,
                            fontWeight: 600,
                            px: 4,
                            py: 1.2
                        }}
                    >
                        Create a Quiz
                    </Button>
                </Box>

                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                >
                    {quizzes.map(quiz => (
                        <Grid
                            item
                            xs={12}
                            md={8}   // Wider cards (66% width)
                            key={quiz._id}
                        >
                            <Card
                                elevation={8}
                                sx={{
                                    borderRadius: 3,
                                    background: "rgba(255,255,255,0.35)",
                                    backdropFilter: "blur(6px)",
                                    padding: 2,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, color: "#AD1457" }}
                                    >
                                        {quiz.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 2,
                                            color: "#6A1B9A",
                                            fontSize: "0.95rem"
                                        }}
                                    >
                                        {quiz.description}
                                    </Typography>

                                    <Button
                                        component={Link}
                                        to={`/take-quiz/${quiz._id}`}
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            backgroundColor: "#FF4F79",
                                            "&:hover": { backgroundColor: "#E63A65" },
                                            color: "#fff",
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            py: 1
                                        }}
                                    >
                                        Take Quiz
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
