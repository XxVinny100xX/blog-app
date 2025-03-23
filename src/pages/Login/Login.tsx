// src/pages/TeacherLogin.jsx
import { Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const LoginBox = styled.div`
  background-color: #00838F;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h2`
  color: white;
`;

const SubTitle = styled.p`
  color: white;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 3px;
  background-color: #ffff;
  color: #000;
  width: 90%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 20px 30px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 20px;
  margin-top: 10px;

  &:hover {
    background-color: #439846;
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: #fff;
  text-decoration: none;
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
  );
};

export default Login;