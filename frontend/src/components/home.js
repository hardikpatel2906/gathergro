import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const CustomButton = styled(Button)({
  background: "#B4D9B6",
  color: "black"
});

function Home() {
  const [productList, setProductList] = useState([]);

  const getProductData = async () => {
    const result = await axios.get("http://localhost:5000/api/listProducts");
    if (result.data.status) {
      setProductList(result.data.response);
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <div>
      <h2 style={{ fontFamily: 'Nunito, sans-serif' }}>Welcome to GatherGro</h2>
      <Box sx={{ flexWrap: 'wrap', display: 'flex' }}>
        <Grid container
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {productList.map((product, index) => (
            <Card sx={{ maxWidth: 320, minWidth: 240, margin: 2, borderRadius: '15px' }} >
              <CardMedia
                component="img"
                height="200"
                width="100"
                image={`http://localhost:5000/product_images/${product.productImages}`}
                alt="Rubber Plant"
              // sx={{ borderRadius: '0 0 0 70px' }}
              />
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" component="div" style={{ fontFamily: 'Nunito, sans-serif', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="h6" component="div" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    ${product.price}
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
