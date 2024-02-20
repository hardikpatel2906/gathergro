import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
  background: "#B4D9B6",
  color: "black"
});

function Home() {
  return (
    <div>
      <h2 style={{ fontFamily: 'Nunito, sans-serif' }}>Welcome to GatherGro</h2>
      <Box sx={{ flexWrap: 'wrap', display: 'flex' }}>
        <Grid container
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {Array.from(Array(8)).map((_, index) => (
            <Card sx={{ maxWidth: 320, minWidth: 240, margin: 2, borderRadius: '15px' }} >
              <CardMedia
                component="img"
                height="200"
                width="100"
                image={`/produce.jpg`}
                alt="Rubber Plant"
              // sx={{ borderRadius: '0 0 0 70px' }}
              />
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" component="div" style={{ fontFamily: 'Nunito, sans-serif', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Product
                  </Typography>
                  <Typography variant="h6" component="div" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    $10
                  </Typography>
                </div>
                <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Nunito, sans-serif', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Typography>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton size="small" color="success" variant="contained" sx={{ borderRadius: '10px', margin: '10px', fontFamily: 'Nunito, sans-serif' }}>
                  Add to cart
                </CustomButton>
                <CustomButton size="small" color="success" variant="contained" sx={{ borderRadius: '10px', margin: '10px', fontFamily: 'Nunito, sans-serif' }}>
                  Buy Now
                </CustomButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
