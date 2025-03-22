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

const ButtonAccess = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
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

          <ButtonContainer>
            <Link to={`/post/${post._id}`}>
              <ButtonAccess>Acessar Post</ButtonAccess>
            </Link>
          {isLoggedIn && (
            <Button onClick={() => {
              onDeletePost(post._id); 
            }}>Deletar Post</Button>
          )};
          </ButtonContainer>  
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;