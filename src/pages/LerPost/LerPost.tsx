import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';
import { getPost } from '../../api';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const PostContainer = styled.div`
  width: 85%;
  margin-width: 960px;
  padding: 60px;
  background-color: #D9D9D9;
  border-radius: 12px;
`;

const PostTitle = styled.h2`
  color: #007b85;
  font-size: 38px;
  margin-bottom: 20px;
  line-height: 1.2;
  font-weight: 700;
`;

const PostAuthor = styled.p`
  font-size: 18px;
  color: #007b85;
  margin-bottom: 30px;
  font-style: italic;
`;

const PostContent = styled.p`
  font-size: 18px;
  color: #444;
  text-align: justify;
  line-height: 1.7;
  white-space: pre-line;
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
        setTimeout(() => {setError(null);}, 5000);
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
