import { styled } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import "./Carrinho.css";
import RoomIcon from "@mui/icons-material/Room";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { AuthContext } from "../context/AuthContext";
import RocketIcon from "@mui/icons-material/Rocket";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";

const StyledButton = styled(Button)`
  color: #ff8e00;
  background-color: white;
  border-color: #ff8e00;
  border: 1px solid;
  &:hover {
    color: #ff8e00;
  }
`;

const Carrinho = () => {
  //   const user = sessionStorage.getItem("userId");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [dadosEndereco, setDadosEndereco] = useState({});

  const getCarrinho = async () => {
    try {
      const response = await api.get("/user/products/" + user.usu_id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const getEndereco = async () => {
    try {
      const response = await api.get("/user/address/" + user.usu_id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDadosEndereco(response.data);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const fetchRemoverProduto = async (id) => {
    api
      .patch(
        "product/" + id,
        { userId: null },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        toast.success("Produto removido do carrinho!");
        getCarrinho();
      });
  };

  useEffect(() => {
    getCarrinho();
    getEndereco();
  }, []);

  function handleEditar() {
    navigate("/Usuario");
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div class="grid-carrinho">
        <div class="endereco">
          <div class="endereco-title">
            <RoomIcon color="warning"></RoomIcon>
            <h2>SELECIONE O ENDEREÇO</h2>
          </div>
          <div class="endereco-dados">
            <p>
              {dadosEndereco.street}, {dadosEndereco.number}
            </p>
            <p>{dadosEndereco.neighborhood}</p>
            <p>{dadosEndereco.city}</p>
          </div>
          <div class="editar">
            <a class="editar-link resumo" onClick={() => handleEditar()}>
              EDITAR
            </a>
          </div>
        </div>
        <div class="total">
          <div class="endereco-title resumo">
            <RocketIcon></RocketIcon>
            <h3>Resumo</h3>
          </div>
          <p>
            Valor dos produtos: R$
            {produtos
              .reduce((acc, produto) => acc + produto.price, 0)
              .toFixed(2)
              .replace(".", ",")}
          </p>
          <div class="total-itens">
            <p>
              Valor a vista no <strong>PIX</strong>
            </p>
            <p class="preco-desconto">
              {(produtos.reduce((acc, produto) => acc + produto.price, 0) * 0.9)
                .toFixed(2)
                .replace(".", ",")}
            </p>
          </div>
          <StyledButton>IR PARA O PAGAMENTO</StyledButton>
          <StyledButton onClick={() => navigate("/")}>
            CONTINUAR COMPRANDO
          </StyledButton>
        </div>
        <div class="itens">
          <div class="endereco-title">
            <LocalMallIcon color="warning"></LocalMallIcon>
            <h2>PRODUTOS</h2>
          </div>
          <div>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <div key={produto.id} id="produto">
                  <div class="itens-produtos">
                    <img
                      class="itens-imagem"
                      src={produto.url_image}
                      alt="produto"
                    />
                    <div class="itens-texto">
                      <p>
                        <strong>{produto.name}</strong>
                      </p>
                      <p>
                        Preço: R$ {produto.price?.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                  <div class="editar">
                    <a
                      class="remover-link"
                      onClick={() => fetchRemoverProduto(produto.id)}
                    >
                      {" "}
                      REMOVER
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Sem produtos</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrinho;
