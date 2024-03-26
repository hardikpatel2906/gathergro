import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#76c893", // A green shade you can adjust according to your app's design
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.1rem",
    },
  },
});

const AboutUs = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box my={5}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            About GatherGro
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1">
                  To revolutionize the way communities interact with local food
                  systems by connecting consumers directly with local farmers
                  and food producers.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Why GatherGro?
                </Typography>
                <Typography variant="body1">
                  Supporting local economies, promoting healthier eating habits,
                  and fostering environmental stewardship through sustainable
                  and transparent food supply chains.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1">
                  To create a platform that not only serves as a bridge between
                  consumers and local producers but also educates and inspires
                  communities to adopt sustainable practices for a healthier
                  planet.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AboutUs;
