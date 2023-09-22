import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import data from "../utils/data";
import dbConnect from "../utils/db";
import Product from "../model/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/store";
import { useSnackbar } from "notistack";

function Index(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/`);

    if (data.countInStock <= 0) {
      window.alert("Sorry. product is out of stock");
      return;
    }
  
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
    // router.push('/carts')

    enqueueSnackbar(`${product.name} Add In your cart!`, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      preventDuplicate: true,
    });
  };
  return (
    <Layout title={"Home"}>

      <Grid container spacing={2}>
        {products?.map((product, i) => {
          return (
         
              <Grid item lg={3} md={4} sm={6} xs={12} key={i}>
                <Card> 
                  <CardActionArea
                    onClick={() => {
                      router.push(`/product/${product.slug}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={products.name}
                    ></CardMedia>
                  
                  </CardActionArea>

                  <CardActions>
                    <CardContent sx={{display:"flex",gap:"5px",flexDirection:"column"}}>
                      <Typography sx={{fontSize:"20px",fontWeight:"600"}}>{product.name}</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                     <span style={{color:"#C1C1C1"}}>Price : </span> ₹{product.price}
                    </Typography>
                    <Rating 
                    value={Math.abs(Math.random() * 10)}
                    />
                    </CardContent>
                  </CardActions>
                  <CardContent>
                  <Button fullWidth variant="outlined" onClick={() => addToCartHandler(product)}>
                    Add to cart
                  </Button>
                  </CardContent>
                </Card>
              </Grid>
            
          );
        })}
      </Grid>
      <Box padding={"50px"}>

      </Box>
    </Layout>
  );
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

export async function getServerSideProps() {
  await dbConnect();
  const product = await Product.find({}).lean();

  return { props: { products: product.map(convertDocToObj) } };
}

export default Index;
