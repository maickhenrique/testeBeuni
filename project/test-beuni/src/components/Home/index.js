import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import './style.css';
import SelectedProducts from '../Products/SelectedProducts';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
        <Container>
            <Row>
                <Col className='desc-beUni'>
                    <p>TUDO EM UM SÓ LUGAR</p>
                    <h1>
                        BeUni: crie brindes personalizados, armazene e envie para todo o Brasil e mundo quando quiser
                    </h1>
                    <Link to={`/shop`} style={{ textDecoration: 'none', color: 'inherit'}} >
                        <Button className='btn-shop'>Comprar</Button>
                    </Link>
                </Col>
                <Col className='home-img'>
                    <Image className='img-geometric d-none d-md-block' src='../logo-1.png' rounded/>
                    <Image className='img-beUni d-none d-md-block' src='../logo.png' rounded />
                </Col>
            </Row>
        </Container><br />
        <SelectedProducts />
    </>
  );
};

export default Home;
