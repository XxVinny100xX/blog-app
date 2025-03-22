import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types';

const PostContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #ddd;
  border-radius: 8px;
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

const PostDetail: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length > 0) {
      const foundPost = posts.find(p => p.id === Number(id));
      setPost(foundPost || null);
    }
  }, [posts, id]);

  if (!post) {
    return <PostContainer><h2>Post não encontrado!</h2></PostContainer>;
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