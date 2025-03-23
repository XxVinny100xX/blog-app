import React from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F5E1C5;
  padding: 15px 30px;
`;

const Title = styled.h1`
  font-size: 27px;
  color: #00838F;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  margin-right: 50px;
  padding: 16px 35px;
  border: none;
  border-radius: 8px;
  font-size: 20px;

  &:hover {
    background-color: #439846;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffff;
  font-size: 25px;
`;

const SearchBarContainer = styled.div`
  background-color: #00838F;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-itens: center;
  padding-left: 30px;
  padding-right: 5px;
`;

const SearchInput = styled.input`
  width: 15%;
  padding: 15px;
  margin-right: 75px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: #ffff;
  color: #000;
`;

const ButtonHeader = styled.button`
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;

  &:hover {
  background-color:#439846;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const isCreatePostPage = location.pathname === '/criar';

  return (
    <>
      <HeaderContainer>
        <Title>Colégio Lumiar</Title>
        <ButtonGroup>
          {isLoggedIn ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/login-docente")}>Sou Docente</Button>
          )}
        </ButtonGroup>
      </HeaderContainer>

      <SearchBarContainer>
        <Nav>
          <ButtonHeader>
            <StyledLink to="/">Home</StyledLink>
          </ButtonHeader>
          {isLoggedIn && !isCreatePostPage && (
            <>
              <ButtonHeader>
              <StyledLink to="/criar">Criar Postagens</StyledLink>
              </ButtonHeader>
            </>
          )}
        </Nav>

        <SearchInput type="text" placeholder="Buscar..." />
      </SearchBarContainer>
    </>
  );
};

export default Header;