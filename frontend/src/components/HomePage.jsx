import { Typography, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FCE8F1, #F8BBD0)", // LIGHT PINK GRADIENT
                padding: 2
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    padding: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.35)",  // SOFT GLASS EFFECT
                    color: "#4A4A4A"
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: "#FF4F79"  // ACCENT PINK TITLE
                    }}
                    gutterBottom
                >
                    Online Quiz Maker
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 4,
                        color: "#7A7A7A"
                    }}
                >
                    Create quizzes, test yourself & track progress.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/create-quiz"
                        variant="contained"
                        sx={{
                            backgroundColor: "#FF4F79",   // STRONG PINK
                            "&:hover": { backgroundColor: "#E63A65" }
                        }}
                    >
                        Create a Quiz
                    </Button>

                    <Button
                        component={Link}
                        to="/quizzes"
                        variant="outlined"
                        sx={{
                            borderColor: "#FF4F79",
                            color: "#FF4F79",
                            "&:hover": {
                                borderColor: "#E63A65",
                                color: "#E63A65"
                            }
                        }}
                    >
                        Take a Quiz
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
