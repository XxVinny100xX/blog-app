import React, { useState } from 'react';
import styled from 'styled-components';
import { addPost } from '../../api';
import { useNavigate } from 'react-router-dom';

interface AddPostProps {
  onPostCreate: () => void;
}

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  color: #00838F;
  font-size: 36px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 32px;
  color: #00838F;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  background-color: #D9D9D9;
  color: #000;
`;

const Textarea = styled.textarea`
  height: 300px;
  padding: 12px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  background-color: #D9D9D9;
  resize: none;
  color: #000;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ color: string }>`
  padding: 24px 40px;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};

  &:hover {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
`;

const AddPost: React.FC<AddPostProps> = ({onPostCreate}) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!titulo.trim() || !conteudo.trim() || !autor.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }

    setLoading(true);

    const newPost = { titulo, conteudo, autor };

    try {
      const data = await addPost(newPost);
      if (data.success === false) {
        setError(data.error);
      } else {
        onPostCreate();
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setError('Erro ao criar post. Tente novamente mais tarde.');
      setTimeout(() => {setError(null);}, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonsContainer>
        <Button type="submit" color="#2E8B57" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar'}
        </Button>
        <Button type="button" color="#D32F2F" onClick={() => navigate('/')}>
          Cancelar
        </Button>
      </ButtonsContainer>

      <Title>Criar nova postagem</Title>

      <Form onSubmit={handleSubmit}>
        <Label>Título:</Label>
        <Input
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <br />

        <Label>Autor:</Label>
        <Input
          type="text"
          placeholder="Autor do Post"
          value={autor}
          onChange={e => setAutor(e.target.value)}
        />
        <br />

        <Label>Conteúdo:</Label>
        <Textarea
          placeholder="Conteúdo do Post"
          value={conteudo}
          onChange={e => setConteudo(e.target.value)}
        />
        <br />
      </Form>
    </Container>
  );
};

export default AddPost;
