// src/pages/TeacherLogin.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  background-color: #F5DEB3; // Cor de fundo bege claro
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que ocupa a altura total da tela */
`;

const LoginBox = styled.div`
  background-color: #008080; // Cor de fundo verde água
  padding: 30px;
  border-radius: 5px;
  text-align: center;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 15px;
`;

const SubTitle = styled.p`
  color: white;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 3px;
  width: 100%; /* Largura total dentro do container */
  box-sizing: border-box; /* Garante que padding não aumenta a largura total */
`;

const Button = styled.button`
  background-color: #4CAF50; // Cor de fundo verde do botão
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const BackLink = styled(Link)`
  display: block; /* Para o link ocupar a largura e margin funcionar */
  margin-top: 20px;
  color: #008080; // Cor do texto do link igual ao fundo do container
  text-decoration: none; /* Remove sublinhado padrão do link */
`;


const Login = () => {
  return (
    <LoginPageContainer>
      <LoginBox>
        <Title>Colégio Lumiar</Title>
        <SubTitle>Guia do docente</SubTitle>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Button>Entrar</Button>
        <BackLink to="/">Voltar para página inicial</BackLink>
      </LoginBox>
    </LoginPageContainer>
  );
};

export default Login;