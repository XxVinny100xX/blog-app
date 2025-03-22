import React from 'react';
import styled from 'styled-components';
import { Post } from '../../types';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PostListProps {
  posts: Post[];
  onDeletePost: (id: string) => void;
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 80%;
  margin: 0 auto;
`;

const ListItem = styled.li`
  background-color: #ddd;
  padding: 35px;
  margin: 20px 0;
  border-radius: 10px;
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
  color: #00838F;
`;

const PostAuthor = styled.p`
  margin: 0;
  font-size: 23px;
  color: #00838F;
`;

const PostContent = styled.p`
  margin: 5px 0;
  font-size: 20px;
  color: #000;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 20px 50px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 17px;
  border: none;

  &:hover {
    background-color: #439846;
  }
`;

const PostList: React.FC<PostListProps> = ({ posts, onDeletePost }) => {
  const { isLoggedIn } = useAuth();

  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post._id}>
          <PostInfo>
            <PostTitle>{post.titulo}</PostTitle>
            <PostAuthor>criado por: {post.autor}</PostAuthor>
            <PostContent>{post.conteudo}</PostContent>
          </PostInfo>
          <Link to={`/post/${post._id}`}>
            <Button>Acessar Post</Button>
          </Link>
          {isLoggedIn && (
            <Link to={`/modificar/${post._id}`}>
              <Button>Editar Post</Button>
            </Link>
          )}
          {isLoggedIn && (
            <Button onClick={() => {
              onDeletePost(post._id); 
            }}>Deletar Post</Button>
          )};  
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;