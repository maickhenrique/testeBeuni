import React, { useState } from 'react';
import ProductFilter from './ProductFilter';
import './style.css';
import getProducts from '../../api/api'; 
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BeUniStore = () => {

    const [products, setProducts] = useState([]);

    const handleFilter = async (filters) => {
      try { 
        //chamada à API com os filtros
        const filteredProducts = await getProducts(filters);
  
        // atualiza o estado dos produtos com os resultados filtrados
        setProducts(filteredProducts.products || []);
      } catch (error) {
        console.error('Erro ao aplicar filtros:', error.message);
      }
    };

  return (
    <>
      <ProductFilter onFilter={handleFilter} />
      <Container>
        <br/>
        <Row>
          {Array.isArray(products) && products.length > 0 ? (
            products.slice(0, 4).map((product) => (
              <Col key={product.id}>
                {/* link para os detalhes do produto */}
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card className='h-100'>
                    <Card.Img variant="top" className='img-product' src={product ? product.image[0].thumb : ''} rounded />
                    <Card.Body>
                      <Card.Title className='title-product'>{product.name}</Card.Title>
                      <p className='number-money-product'><span className='font-money'>R$:</span> {product.price.toFixed(2)}</p>
                      <Button className='btn-shop'>Comprar</Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </Row>
      </Container>      
    </>
  );
};

export default BeUniStore;
