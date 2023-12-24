import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getProducts from '../../api/api';
import { Row, Col, Container, Image, Button,Form } from 'react-bootstrap';


const QuantityInput = ({ minimumQuantity, onChange }) => {
  const [quantity, setQuantity] = useState('');

  const handleQuantityChange = (e) => {
     // função responsável para verificar a quantidade inserida
    const inputValue = e.target.value;
    const newQuantity = /^\d+$/.test(inputValue) ? Math.max(parseInt(inputValue, 10), minimumQuantity) : minimumQuantity;

    if (inputValue >= 0){
      setQuantity(inputValue);
      onChange(newQuantity);
    } 
  };
  
  return (
    <div>
    <Form.Label className='text-input' htmlFor="quantityInput">Quantidade</Form.Label>
      <Form.Control
          className='quantity-input'
          type="number"
          id="quantityInput"
          onChange={handleQuantityChange}
          value={quantity}
      />
    {quantity < minimumQuantity && <p className='message-error'>Quantidade mínima: {minimumQuantity}</p>}
    </div>
  )};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(50);

  //buscar os detalhes de um produto com base no id 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const queryParams = {
          id: id,
        };

        const response = await getProducts(queryParams);

        if (response.products && response.products.length > 0) {
          setProduct(response.products[0]);
        } else {
          console.error(`Produto com ID ${id} não encontrado.`);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

   // função responsável por criar as estrelas da avaliação
  const Rating = ({ value }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= value ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Image className='img-product' src={product ? product.image[0].thumb : ''} rounded />
          </Col>
          <Col xs={12} md={6} className='desc-product'>
            {product ? (
              <div>
                <h1 className='product-title'>{product.name}</h1>
                <Rating value={product.rating} />
                <p className='number-money'><span className='font-money'>R$:</span> {product.price.toFixed(2)}</p>
                <p className='desc-text'>{product.description}</p>
                <p>Estoque:&nbsp;
                {product.total_stock > 1
                  ? `${product.total_stock} disponíveis`
                  : `${product.total_stock} disponível`}
              </p>
                <hr />
                <QuantityInput minimumQuantity={product.minimumQuantity} onChange={setSelectedQuantity} />
                
                  <Button className='btn-cart'>
                    Adicionar ao Carrinho
                  </Button>
          
              </div>
            ) : (
              <p>Carregando detalhes do produto...</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
