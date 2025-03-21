import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';
import { updatePost } from '../../api';

interface ModificaPostProps {
  posts: Post[];
}

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #007b85;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #ddd;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  background-color: #ddd;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background-color: #4CAF50;
  color: white;
  font-size: 18px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #d9534f;
  color: white;
  font-size: 18px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #c9302c;
  }
`;

const ModificaPost: React.FC<ModificaPostProps> = ({ posts }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("id");
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (postId) {
      const foundPost = posts.find(p => String(p.id) === postId);
      if (foundPost) {
        setPost(foundPost);
        setTitulo(foundPost.titulo);
        setConteudo(foundPost.conteudo);
        setAutor(foundPost.autor);
      }
    }
  }, [posts, postId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if(!titulo || !conteudo || !autor) {
      setError('Preencha todos os campos!');
      setLoading(false);
      return;
    }

    if (!post || !post.id) {
      setError('Post não encontrado!');
      setLoading(false);
      return;
    }

    const updatedPost = {
      titulo,
      conteudo,
      autor,
    };

    try {
      const data = await updatePost(post.id, updatedPost);
      if (data.success === false) {
        setError(data.error);
      } else {
        navigate('/');
      }
    }catch(error) {
      console.error('Erro ao atualizar post:', error);
      setError('Erro ao atualizar o post. Tente novamente mais tarde.');
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
      <Input type="text" value={post.titulo} readOnly />

      <Label>Autor:</Label>
      <Input type="text" value={`criado por: ${post.autor}`} readOnly />

      <Label>Insira aqui o conteúdo da postagem:</Label>
      <TextArea
        value={post.conteudo}
        onChange={(e) => setPost({ ...post, conteudo: e.target.value })}
      />

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
