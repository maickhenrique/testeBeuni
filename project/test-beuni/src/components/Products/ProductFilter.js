import React, { useState, useEffect } from 'react';
import { Form, Button,  Row, Col, Container } from 'react-bootstrap';
import getProducts from '../../api/api'; 

const ProductFilter = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar produtos da API
    const fetchProductsFromApi = async () => {
      try {
        const queryParams = {

        };

        // Chamar a função e aguardar a resposta
        const response = await getProducts(queryParams);

        // Atualiza o estado dos produtos com a resposta da API
        setProducts(response.products || []);
      } catch (error) {
        console.error('Erro ao buscar produtos da API:', error.message);
      }
    };

    fetchProductsFromApi();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Chamarr a função de filtro passando os parâmetros
    onFilter({
      q: searchQuery,
      category,
      min: minPrice,
      max: maxPrice,
      sortBy,
    });
  };

  return (
    <>
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <Form inline onSubmit={handleFilterSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Control
                  controlId="searchQuery"
                  variant="outline-secondary"
                  title="Buscar"
                  id="segmented-button-dropdown-2"
                  alignRight
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col xs={12} md={6}>
                <Button className='search-product' type="submit" onChange={(e) => setSearchQuery(e.target.value)}>Buscar</Button>
              </Col>
            </Row>
         </Form>
        </Col>
        <Col>
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={handleFilterSubmit}>
              <Form.Group controlId="sortBy">
                  <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option>Ordernar por</option>
                    <option value="featured">Recomendados</option>
                    <option value="price-asc">Menor para Maior Preço</option>
                    <option value="price-desc">Maior para Menor Preço</option>
                  </Form.Control>
              </Form.Group>
              <Button className='filter-product' variant="primary" type="submit">
              Filtrar
            </Button>
            </Form>
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ProductFilter;
