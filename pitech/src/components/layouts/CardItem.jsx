import { React, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import "./CardItem.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import Produto from "../pages/Produto/Produto";

import { Link, Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  color: "white",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  borderRadius: "20px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  borderColor: "black",
  color: "black",
  "&:hover": {
    backgroundColor: "#ff8e00",
    color: "#ffffff",
  },
}));

const CardItem = (props) => {
  const titulo = props.titulo;
  const image = props.image;
  const preco = props.preco;
  const idProduto = props.id;
  const navigate = useNavigate();

  function mostraProduto() {
    navigate(`/Produto`, { state: { id: idProduto } });
  }

  return (
    <StyledCard style={{ maxHeight: "450px", maxWidth: "300px" }}>
      <CardContent>
        <CardActionArea sx={{ ":hover": { backgroundColor: "#ffffff" } }}>
          <CardMedia
            component="img"
            width="200"
            height="140"
            image={image}
            style={{
              height: "90%",
              width: "90%",
              maxWidth: "300px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
          <Grid overflow={"hide"} height={10} sx={{ height: "100%" }}>
            <h4 className="titulo">{titulo}</h4>
          </Grid>
        </CardActionArea>
      </CardContent>
      <Grid m={"auto"}>
        <p className="valor">R$ {preco}</p>
      </Grid>
      <StyledButton
        sx={{ width: "90%" }}
        onClick={() => mostraProduto()}
        variant="outlined"
      >
        Ver mais
      </StyledButton>
    </StyledCard>
  );
};

export default CardItem;
