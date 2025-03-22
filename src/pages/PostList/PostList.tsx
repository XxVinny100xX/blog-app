import React from 'react';
import styled from 'styled-components';
import { Post } from '../../types';
import { Link } from 'react-router-dom';

interface PostListProps {
  posts: Post[];
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 80%;
  margin: 0 auto;
`;

const ListItem = styled.li`
  background-color: #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 30px;
  color: #007b85;
`;

const PostAuthor = styled.p`
  margin: 0;
  font-size: 1px;
  color: #007b85;
`;

const PostContent = styled.p`
  margin: 5px 0;
  font-size: 20px;
  color: #333;
`;

const Button = styled.button`
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

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id}>
          <PostInfo>
            <PostTitle>{post.titulo}</PostTitle>
            <PostAuthor>criado por: {post.autor}</PostAuthor>
            <PostContent>{post.conteudo}</PostContent>
          </PostInfo>
          <Link to={`/post/${post.id}`}>
            <Button>Acessar Post</Button>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;