import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';
import { getPost } from '../../api';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const PostContainer = styled.div`
  width: 90%;
  padding: 90px 50px;
  background-color: #D9D9D9;
  border-radius: 8px;
`;

const PostTitle = styled.h2`
  color: #007b85;
  display: flex;
  font-size: 32px;
`;

const PostAuthor = styled.p`
  font-size: 18px; /* Aumentei o tamanho para 18px */
  color: #007b85;
`;

const PostContent = styled.p`
  font-size: 20px; /* Aumentei o tamanho para 20px */
  color: #333;
  text-align: justify;
`;

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPost(String(id));
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
    return <PostContainer>Carregando detalhes do post...</PostContainer>;
  }

  if (error) {
    return <PostContainer><h2>{error}</h2></PostContainer>;
  }

  if (!post) {
    return <PostContainer><h2>Post não encontrado!</h2></PostContainer>;
  }

  return (
    <Wrapper>
      <PostContainer>
        <PostTitle>{post.titulo}</PostTitle>
        <PostAuthor>criado por: {post.autor}</PostAuthor>
        <PostContent>{post.conteudo}</PostContent>
      </PostContainer>
    </Wrapper>
  );
};

export default PostDetail;
