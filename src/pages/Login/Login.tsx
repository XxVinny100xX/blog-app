import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  background-color: #F5DEB3;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginBox = styled.div`
  background-color: #008080;
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
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: #008080;
  text-decoration: none;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    if (email === 'testefiap3fsdt@gmail.com' && password === '1234') {
      alert('Login bem-sucedido!');
    } else {
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <LoginPageContainer>
      <LoginBox>
        <Title>Colégio Lumiar</Title>
        <SubTitle>Guia do docente</SubTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Entrar</Button>
        <BackLink to="/">Voltar para página inicial</BackLink>
      </LoginBox>
    </LoginPageContainer>
  );
};

export default Login;
