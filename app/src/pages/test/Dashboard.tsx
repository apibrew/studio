import { Container, Grid, Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Dashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome back, Faiza Rzayeva
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem Ipsum dolor sit amet lorem Ipsum dolor sit amet
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box>
                            <Typography variant="body2">YouTube</Typography>
                            <Typography variant="caption">Lorem Ipsum Dolor Sit Amet</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box>
                            <Typography variant="body2">FAQ</Typography>
                            <Typography variant="caption">Lorem Ipsum Dolor Sit Amet</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box>
                            <Typography variant="body2">Community</Typography>
                            <Typography variant="caption">Lorem Ipsum Dolor Sit Amet</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box>
                            <Typography variant="body2">Documentation</Typography>
                            <Typography variant="caption">Lorem Ipsum Dolor Sit Amet</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ my: 4 }}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h5">Test</Typography>
                            <Box>
                                <Button variant="outlined">Select dates</Button>
                                <Button variant="outlined">Filters</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid item xs={12} md={3} key={index}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="body2">Today's revenue</Typography>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h5">$1,280</Typography>
                                    <Typography variant="body2" color="success.main">
                                        +15%
                                    </Typography>
                                    <Box display="flex" justifyContent="center" my={2}>
                                        <Button variant="contained">View report</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" sx={{ my: 4 }}>Client libraries</Typography>

                <Grid container spacing={2}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid item xs={12} md={3} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">JavaScript</Typography>
                                    <Typography variant="caption">Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit Amet</Typography>
                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                        <Typography variant="body2">Name 2</Typography>
                                        <Typography variant="body2">Name 1</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
