import { useEffect, useState } from 'react'
import CarouselModule from 'react-multi-carousel'
import { api } from '../../services/api'
import { Container, Title } from './styles'
import 'react-multi-carousel/lib/styles.css'
import { formatPrice } from '../../utils/formatPrice'
import { CardProduct } from '../CardProduct'

export function OffersCarousel() {
const Carousel = CarouselModule.default

  const [offers, setOffers] = useState([])

useEffect(() => {
  async function loadProducts() {
const { data } = await api.get("/products");

const onlyOffers = data.filter((product) => product.offer).map((product) => ({
  currencyValue: formatPrice(product.price),
  ...product
}));

setOffers(onlyOffers);
}

  loadProducts()
}, [])

  const responsive = {
    superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    },
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1280, min: 680 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 690, min: 0 },
    items: 2,
  },
};

return ( 
<Container>
<Title>Ofertas do dia</Title>
<Carousel
responsive={responsive}
infinite={true}
partialVisible={false}
itemClass="carousel-item"
>
{offers.map( product => (
<CardProduct key={product.id} product={product} />
))}
</Carousel>
</Container>
)
}
