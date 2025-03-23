// src/pages/TeacherLogin.jsx
import { Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const LoginPageContainer = styled.div`
  background-color: #f0f2f5; 
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px; 
`;

const LoginBox = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #00838F;
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 700;
`;

const SubTitle = styled.p`
  color: #777;
  margin-bottom: 30px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #00838F;
    box-shadow: 0 0 5px rgba(0, 131, 143, 0.5);
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #439846;
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 25px;
  color: #777;
  text-decoration: none;
  font-size: 15px;

  &:hover {
    text-decoration: underline;
    color: #555;
  }
`;

const Login = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = async () => {
    setLoading(true);
    setError(null);

    if(!email || !password) {
      setError('Preencha todos os campos!');
      setTimeout(() => setError(null), 5000);
      setLoading(false);
      return;
    }
    try{
      
      await login(email, password);
      navigate('/');

    } catch(error) {
      setError('Email ou senha incorretos!');
        setTimeout(() => setError(null), 5000);
    }finally{
      setLoading(false);
    }
 };
  return (
    <LoginPageContainer>
      <LoginBox>
        <Title>Colégio Lumiar</Title>
        <SubTitle>Guia do docente</SubTitle>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleLoginClick}>Entrar</Button>
        <BackLink to="/">Voltar para página inicial</BackLink>
        {loading && <div>Carregando...</div>}
        {error && <div className="mensagem">{error}</div>}
      </LoginBox>
  </LoginPageContainer>
  );
};

export default Login;