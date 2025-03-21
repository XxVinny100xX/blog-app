import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';

interface ModificaPostProps {
  posts: Post[];
  onModificaPost: (post: Post) => void;
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

const ModificaPost: React.FC<ModificaPostProps> = ({ posts, onModificaPost }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id, posts]);

  if (!post) {
    return <Container><h2>Post não encontrado!</h2></Container>;
  }

  const handleSave = () => {
    onModificaPost(post);
    navigate('/'); // Voltar para a página principal após salvar
  };

  return (
    <Container>
      <Title>Editar postagem</Title>

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
        <SaveButton onClick={handleSave}>Editar</SaveButton>
        <CancelButton onClick={() => navigate('/')}>Cancelar</CancelButton>
      </ButtonContainer>
    </Container>
  );
};

export default ModificaPost;
