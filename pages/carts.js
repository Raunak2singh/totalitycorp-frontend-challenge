import React, { useContext } from "react";
import { Store } from "../utils/store";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Image from "next/image";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  List,
  ListItem,
  Button,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import axios from "axios";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
function Carts() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/`);
    const ss = data.find((k) => (k._id === item._id ? k._id : ""));
    // console.log(ss)

    if (data.countInStock <= 0) {
      window.alert("Sorry. product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemhandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <Layout title="Shopping Cart">
      <Typography component={"h1"} variant="h1 ">
        Your Cart items{" "}
      </Typography>
      {cartItems.length === 0 ? (
        <>cart is empty</>
      ) : (
        <>
          <Grid container spacing={6} >
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                        </TableCell>

                        <TableCell>
                          <Typography
                            component={"a"}
                            sx={{fontSize:"20px",fontWeight:"600"}}
                            href={`/product/${item.slug}`}
                          >
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Select
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{fontSize:"20px",fontWeight:"700"}}>₹{item.price}</Typography>
                          </TableCell>
                        <TableCell align="right">
                          <IconButton
                            variant="contained"
                            color="danger"
                            onClick={() => removeItemhandler(item)}
                          >
                            <DeleteOutlineRoundedIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) :
                      <span style={{fontSize:"20px",fontWeight:"700"}}>
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{" "}
                      rs/-
                      </span>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      sx={{fontWeight:"700"}}
                      color="success"
                      fullWidth
                      onClick={checkoutHandler}
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Carts), { ssr: false });
