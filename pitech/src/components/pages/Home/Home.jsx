import CardItem from "../../layouts/CardItem";
import CardMenu from "../../layouts/CardMenu";
import "./Home.css";
import Cadeiras from "../../../assets/cadeira.png";
import Computadores from "../../../assets/computadores.png";
import Games from "../../../assets/games.png";
import Hardware from "../../../assets/hardware.jpeg";
import Notebooks from "../../../assets/notebook.png";
import Perifericos from "../../../assets/periferico.png";
import Carousel from "../../layouts/carousel";
import React, { useEffect } from "react";
import api from "../../../services/api";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
  styled,
  useMediaQuery,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = React.useState([]);

  let url = "http://localhost:3000/";

  const fetchProdutos = () => {
    fetch(url + "produtos/", {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProdutos(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api.get("/product").then((response) => {
      setProdutos(response.data);
    });
    //fetchProdutos();
  }, []);

  const StyledHome = styled("div")(() => ({
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600 px
  return (
    <>
      <StyledHome>
        <Carousel />
        {/* <div className="cards_categoria">
        <CardMenu nome="Cadeiras" image={Cadeiras} />
        <CardMenu nome="Computadores" image={Computadores} />
        <CardMenu nome="Games" image={Games} />
        <CardMenu nome="Hardware" image={Hardware} />
        <CardMenu nome="Notebooks" image={Notebooks} />
        <CardMenu nome="Perifericos" image={Perifericos} />
      </div> */}
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          mt={5}
          gap={3}
          width={"100%"}
        >
          <h1 className="titulo_categoria">Categorias</h1>
          <Grid container spacing={3} p={2} justifyContent="center">
            <Grid item xs={6} md={4} lg={2}>
              <CardMenu nome="Cadeiras" image={Cadeiras} />
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <CardMenu nome="Computadores" image={Computadores} />
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <CardMenu nome="Games" image={Games} />
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <CardMenu nome="Hardware" image={Hardware} />
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <CardMenu nome="Notebooks" image={Notebooks} />
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <CardMenu nome="Perifericos" image={Perifericos} />
            </Grid>
          </Grid>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          mt={5}
          gap={3}
          width={"100%"}
        >
          <h1 className="titulo_categoria">Nossos Produtos</h1>
          <Grid
            container
            justifyItems={"center"}
            spacing={2}
            justifyContent={"center"}
          >
            {produtos.map((produto) => {
              return (
                <Grid
                  item
                  maxWidth={"300px"}
                  xs={6}
                  md={4}
                  lg={2}
                  key={produto._id}
                >
                  <CardItem
                    id={produto._id}
                    titulo={produto.nome}
                    image={produto.imagemUrl_1}
                    preco={produto.valor}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </StyledHome>
    </>
  );
};

export default Home;
