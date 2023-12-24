import React, { useState, useEffect }  from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import getProducts from '../../api/api'; 
import './style.css';
import { Link } from 'react-router-dom';

const SelectedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Função para buscar produtos da API
        const fetchProductsFromApi = async () => {
          try {
            const queryParams = {
            };
    
            // Chamar a função da API e aguardar a resposta
            const response = await getProducts(queryParams);
    
            // Atualizar o estado dos produtos com a resposta da API
            setProducts(response.products || []);
          } catch (error) {
            console.error('Erro ao buscar produtos da API:', error.message);
          }
        };
    
        // Chamar a função assíncrona ao montar o componente
        fetchProductsFromApi();
      }, []);
  return (
    <>
    <Container>
        <h1 style={{ textAlign: 'center' }}>Produtos Selecionados</h1><br />
        <Row>
        {products
            .filter((product) => product.rating > 4) // Filtrarr os produtos com rating maior que 4, isso pode ajudar a mostrar os produtos melhor qualificados
            .slice(0, 4) // Pega no máximo os primeiros 4 produtos
            .map((product) => (
            <Col className='product-card' key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card className='h-100'>
                    <Card.Img variant="top" src={product ? product.image[0].thumb : ''} rounded  />
                    <Card.Body>
                        <Card.Title className='title-product'>{product.name}</Card.Title>
                        <Button className='btn-shop'>Comprar</Button>
                    </Card.Body>
                </Card>
                </Link>
            </Col>
            ))}
        </Row>
    </Container>

    </>
  );
};

export default SelectedProducts;
