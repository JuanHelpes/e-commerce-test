import { React, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import "./CardItem.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Produto from "../pages/Produto/Produto";

import { Link, Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  color: "white",
  width: "15%",
  margin: "10px",
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
  // console.log("titulo", titulo);
  const image = props.image;
  const preco = props.preco;
  const idProduto = props.id;
  console.log("card: " + idProduto);
  const navigate = useNavigate();

  function mostraProduto() {
    navigate(`/Produto`, { state: { id: idProduto } });
  }

  return (
    <StyledCard>
      {/* <div className="cont"> */}
      <CardContent sx={{ height: "30%" }}>
        <CardActionArea sx={{ ":hover": { backgroundColor: "#ffffff" } }}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            style={{ height: "100%", objectFit: "cover" }}
          />
          <div className="titulo_container">
            <h4 className="titulo">{titulo}</h4>
          </div>
        </CardActionArea>
      </CardContent>
      <p className="valor">R$ {preco}</p>
      {/* <CardActions> */}
      <StyledButton
        sx={{ width: "90%" }}
        onClick={() => mostraProduto()}
        variant="outlined"
      >
        Ver mais
      </StyledButton>
      {/* </div> */}
      {/* </CardActions> */}
    </StyledCard>
  );
};

export default CardItem;
