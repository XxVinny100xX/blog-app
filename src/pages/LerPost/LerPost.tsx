import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';
import { getPost } from '../../api';

const PostContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  color: #007b85;
`;

const PostAuthor = styled.p`
  font-size: 14px;
  color: #007b85;
`;

const PostContent = styled.p`
  font-size: 16px;
  color: #333;
  text-align: justify;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const PostDetail: React.FC = () => { 
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true); // Para indicar que está carregando
  const [error, setError] = useState<string | null>(null); // Para tratar erros

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPost(Number(id));
        if (data.success === false) {
          setError(data.error);
        } else {
          setPost(data);
        }
      } catch (err) {
        setError("Erro ao carregar os detalhes do post.");
        console.error("Erro ao buscar detalhes do post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <PostContainer>Carregando detalhes do post...</PostContainer>; // Tela de carregamento
  }

  if (error) {
    return <PostContainer><h2>{error}</h2></PostContainer>; // Exibe mensagem de erro
  }

  if (!post) {
    return <PostContainer><h2>Post não encontrado!</h2></PostContainer>; // Mensagem se post for null (mesmo após a busca)
  }

  return (
    <div>
        <BackButton to="/">⬅ Voltar à página inicial</BackButton>
        <PostContainer>
            <PostTitle>{post.titulo}</PostTitle>
            <PostAuthor>criado por: {post.autor}</PostAuthor>
            <PostContent>{post.conteudo}</PostContent>
        </PostContainer>
    </div>
  );
};

export default PostDetail;