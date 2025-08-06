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
import { Box, Grid, styled } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = React.useState([]);

  useEffect(() => {
    api.get("/product").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  const StyledHome = styled("div")(() => ({
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));

  return (
    <>
      <StyledHome>
        <Carousel />
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
                  key={produto.id}
                  m={1}
                >
                  <CardItem
                    id={produto.id}
                    titulo={produto.name}
                    image={produto.url_image}
                    preco={produto.price}
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
