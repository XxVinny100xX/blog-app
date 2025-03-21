import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Container principal do Header
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5d7b3; /* Cor bege claro */
  padding: 15px 30px;
`;

// Estilização do título "Colégio Lumiar"
const Title = styled.h1`
  font-size: 30px;
  color: #004d40; /* Verde escuro */
  margin: 0;
`;

// Container de navegação
const Nav = styled.nav`
  display: flex;
  gap: 15px;
`;

// Botões do canto direito
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #2E8B57; /* Verde */
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 5px;
  font-size: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e6b40; /* Verde mais escuro */
  }
`;

// Links de navegação
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #006d75;
  font-size: 30px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      {/* Título do blog */}
      <Title>Blog do Colégio Lumiar</Title>

      {/* Navegação no meio */}
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/criar">Criar Postagens</StyledLink>
        <StyledLink to="/modificar">Modificar Postagens</StyledLink>
      </Nav>

      {/* Botões à direita */}
      <ButtonGroup>
        <Button>Sou Docente</Button>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;