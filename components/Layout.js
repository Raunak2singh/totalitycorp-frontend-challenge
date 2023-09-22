"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Container,
  IconButton,
  Box,
  Badge,
  Stack,
  Avatar,
} from "@mui/material";
import { Store } from "../utils/store";
import Cookies from "js-cookie";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";

function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const {user, setUserName} = useState()
  const router = useRouter(); 
  const logOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippingAddress");
  };


  return (
    <>

      <Head>
        <title>{title ? `${title} - ShopHouse` : "ShopHouse"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <AppBar position="static" sx={{ boxShadow: "none" ,padding:"20px",background:"#fff"}}>
        <Toolbar sx={{ background: "#fff", gap: "15px" }}>
          <Typography
            component={Link}
            href="/"
            sx={{
              paddingRight: "20px",
              textDecoration: "none",
              fontWeight: "800",
              fontSize:"20px",
              color:"#000",
              '&:hover':{
                color:"#C7C7C7"
              }
            }}
          >
           ShopHouse
          </Typography>
          
          <Box component="span" sx={{ flex: 1 }} />
          <IconButton onClick={()=>{router.push('/carts')}} sx={{position:"relative"}}>
            
            <Box component={"div"} sx={{position:"absolute",top:0,right:0,fontSize:"11px",fontWeight:"700"}}>{(cart?.cartItems.length > 0)? cart?.cartItems.length :""}</Box>

              <ShoppingCartOutlinedIcon />
         
         
          </IconButton>
        

          {userInfo ? (
            <Stack direction={"row"} gap={2}>
              <Avatar>
                {userInfo.name[0]}
              </Avatar>
            <Button onClick={logOut} variant="contained">
              Log out
            </Button>
            </Stack>
          ) : ( 
              <Button
              variant="text"
              sx={{fontWeight:"700",}}
              onClick={()=>{router.push('/LogIn')}} >Log in</Button>
         )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">{children}</Container>
    </>
  );
}

export default Layout;
