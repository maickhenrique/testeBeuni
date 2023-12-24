// Header.js

import React from 'react';
import { Nav } from 'react-bootstrap';
import './style.css';

const Header = () => {
  return (
    <>
        <Nav className="justify-content-center" activeKey="/">
            <Nav.Item>
                <Nav.Link href="/index">Início</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/shop">Loja BeUni</Nav.Link>
            </Nav.Item>
        </Nav>
    </>
  );
};

export default Header;
