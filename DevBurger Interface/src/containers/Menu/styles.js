import { Link } from "react-router-dom";
import styled from "styled-components";
import Background from "../../assets/background.svg"
import BannerHamburguer from "../../assets/banner-hamburguer.svg";


export const Container = styled.div`
width: 100%;
min-height: 100vh;
background-color: #f0f0f0;

background: url("${Background}");
`;

export const Banner = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 480px;
width: 100%;

background: url("${BannerHamburguer}") no-repeat;
background-color: #1f1f1f;
background-position: center;
background-size: cover;

h1 {
font-family: "Road Rage", sans-serif;
font-size: 80px;
line-height: 65px;
position: absolute;
color: #fff;


right: 20%;
top: 20%;

span {
display: block;
color: #fff;
font-size: 20px;
}
}
`;

export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
gap: 50px;
margin-top: 30px;
`;

export const CategoryButton = styled(Link)`
text-decoration: none;
cursor: pointer;
background: none;
color: ${(props) => 
props.$isActiveCategory ? (props) => props.theme.purple : "#696969"};
font-size: 24px;
font-weight: 500;
padding-bottom: 5px;
line-height: 20px;
border-bottom: 3px solid ${(props) => props.theme.purple};
`;

export const ProductsContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
padding: 40px;
gap: 60px;
justify-content: center;
max-width: 1280px;
margin: 50px auto 0;
`;