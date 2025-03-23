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
  margin: 20px auto;
`;

const ListItem = styled.li`
  background-color: #D9D9D9;
  padding: 30px;
  margin-bottom: 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 32px;
  color: #00838F;
  font-weight: 600;
  line-height: 1.3;
`;

const PostAuthor = styled.p`
  margin: 0;
  font-size: 18px;
  color: #00838F;
  font-style: italic;
`;

const PostContent = styled.p`
  margin: 15px 0 0 0;
  font-size: 18px;
  color: #333;
  line-height: 1.6;
`;

const ButtonAccess = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 20px 30px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #439846;
  }
`;

const ButtonDelete = styled.button`
  background-color: #f44336;
  color: white;
  padding: 14px 30px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #d32f2f;
  }
  margin-left: 10px;
`;

const ButtonEdit = styled(Link)`
  background-color: #00bcd4;
  color: white;
  padding: 14px 30px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  margin-left: 10px;

  &:hover {
    background-color: #00acc1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 20px;
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
            <PostContent>
              {post.conteudo.length > 120
                ? `${post.conteudo.substring(0, 120)}...`
                : post.conteudo}
            </PostContent>
          </PostInfo>

          <ButtonContainer>
            <Link to={`/post/${post._id}`}>
              <ButtonAccess>Acessar Post</ButtonAccess>
            </Link>
          {isLoggedIn && (
          <ButtonEdit to={`/modificar/${post._id}`}>Alterar Post</ButtonEdit>
          )}
          {isLoggedIn && (
            <ButtonDelete onClick={() => { onDeletePost(post._id)}}>Deletar Post</ButtonDelete>
          )}

          </ButtonContainer>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;