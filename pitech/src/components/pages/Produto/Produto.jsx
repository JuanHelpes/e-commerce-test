import "./Produto.css";
import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";

const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [imagens, setImagens] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const idProduto = location.state?.id;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/product/" + idProduto).then((response) => {
      setProdutos(response.data);
      const imagensArray = [response.data.url_image, response.data.url_image];
      if (response.data?.url_image_2) {
        console.log(response.data.url_image_2);
        imagensArray.pop();
        imagensArray.push(response.data.url_image_2);
      }
      setImagens(imagensArray);
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  const fetchCarrinho = () => {};

  const handleCarrinho = () => {
    if (user?.usu_id) {
      try {
        api
          .patch(
            "/product/" + idProduto,
            {
              userId: user.usu_id,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then((response) => {
            toast.success("Produto adicionado ao carrinho!");
          });
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        toast.error("Erro ao adicionar produto ao carrinho.");
      }
      // fetchCarrinho();
    } else {
      toast.error(
        "Você precisa estar logado para adicionar produtos ao carrinho."
      );
      //navigate(`/Login`);
    }
  };

  const settings = {
    dots: true,
    prevArrow: (
      <a class="slick-prev" href="#">
        <ArrowBackIosIcon />
      </a>
    ),
    nextArrow: (
      <a class="slick-next" href="#">
        <ArrowForwardIosIcon />
      </a>
    ),
    customPaging: function (i) {
      const targetImage = imagens[i];
      return <img src={targetImage} alt={`Thumbnail ${i}`} />;
    },
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // Função para formatar o preço em moeda brasileira
  const formatarMoeda = (valor) => {
    if (!valor && valor !== 0) return "";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="geral">
        <div className="produto">
          <div className="layout">
            <Slider {...settings}>
              {imagens.map((produto, idx) => (
                <li key={idx}>
                  <img width={500} src={produto} />
                </li>
              ))}
            </Slider>
          </div>

          <div className="desc">
            <h2 className="nome">{produtos?.name}</h2>

            <div className="titulos">
              <div className="valor">
                <div className="descEPreco">
                  <div className="descValor">
                    <LocalAtmIcon />
                    <h5 style={{ fontWeight: "400" }}>
                      Valor à vista no <b>Pix</b>
                    </h5>
                  </div>
                  <p className="preco">
                    <b>{formatarMoeda(produtos?.price)}</b>
                  </p>
                </div>
                <button
                  className="btn_carrinho"
                  onClick={() => handleCarrinho()}
                >
                  Adicionar no carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="product-wrapper" onClick={toggleDescription}>
          <div className="descricao">
            <h2 className="h2_descProduto">Descrição do Produto </h2>
            <div className="toggle-button">{isOpen ? "▲" : "▼"}</div>
          </div>
          <div className={`product-description ${isOpen ? "open" : ""}`}>
            <p>{produtos?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Produto;
