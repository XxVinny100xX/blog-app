import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';
import { updatePost } from '../../api';

interface ModificaPostProps {
  posts: Post[];
  onPostUpdate: () => void;
}

const Container = styled.div`
  width: 90%;
  max-width: 960px;
  margin: 40px auto;
  padding: 40px;
  background-color: #D9D9D9;
  border-radius: 15px;
`;

const Title = styled.h2`
  color: #00838F;
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 17px;
  margin-top: 20px;
  display: block;
  color: #00838F;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 95%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #f8f8f8;
  color: #333;
  outline: none;

  &:focus {
    border-color: #00838F;
  }
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 200px;
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  background-color: #f8f8f8;
  color: #333;
  resize: none;
  outline: none;
  line-height: 1.6;

  &:focus {
    border-color: #00838F;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 20px;
`;

const SaveButton = styled.button`
  background-color: #4CAF50;
  color: white;
  font-size: 17px;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  font-size: 17px;
  font-weight: 500;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ModificaPost: React.FC<ModificaPostProps> = ({ posts, onPostUpdate}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = posts.find(p => String(p._id) === id);
      if (foundPost) {
        setPost(foundPost);
        setTitulo(foundPost.titulo);
        setConteudo(foundPost.conteudo);
        setAutor(foundPost.autor);
      }
    }
  }, [posts, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if(!titulo || !conteudo || !autor) {
      setError('Preencha todos os campos!');
      setTimeout(() => {setError(null);}, 5000);
      setLoading(false);
      return;
    }

    if (!post || !post._id) {
      setError('Post não encontrado!');
      setTimeout(() => {setError(null);}, 5000);
      setLoading(false);
      return;
    }

    const updatedPost = {
      titulo,
      conteudo,
      autor,
    };

    try {
      const data = await updatePost(post._id, updatedPost);
      if (data.success === false) {
        setError(data.error);
      } else {
        onPostUpdate();
        navigate('/');
      }
    }catch(error) {
      console.error('Erro ao atualizar post:', error);
      setError('Erro ao atualizar o post. Tente novamente mais tarde.');
      setTimeout(() => {setError(null);}, 5000);
    }finally{
      setLoading(false);
    }
  };

  if (!post) {
    return <Container><h2>Post não encontrado!</h2></Container>;
  }

  return (
    <Container>
      <Title>Modificar postagem</Title>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Label>Título:</Label>
      <Input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />

      <Label>Criado pelo Autor:</Label>
      <Input type="text" value={autor} onChange={e => setAutor(e.target.value)} />

      <Label>Insira aqui o conteúdo da postagem:</Label>
      <TextArea value={conteudo} onChange={e => setConteudo(e.target.value)}/>

      <ButtonContainer>
        <SaveButton onClick={handleSave} disabled={loading}>
          {loading ? 'Salvando...' : 'Editar'}
        </SaveButton>
        <CancelButton onClick={() => navigate('/')}>Cancelar</CancelButton>
      </ButtonContainer>
    </Container>
  );
};

export default ModificaPost;
