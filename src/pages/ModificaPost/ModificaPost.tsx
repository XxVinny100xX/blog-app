import React, { useState } from 'react';
import styled from 'styled-components';
import { Post } from '../../types';

interface AddPostProps {
  post: Post;
  onModificaPost: (post:Post) => void;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 50vw;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ed145b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c10e49;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const ModificaPost: React.FC<AddPostProps> = ({ post, onModificaPost }) => {

  const [titulo, setTitulo] = useState(""); // Estado para o título
  const [conteudo, setConteudo] = useState(""); // Estado para o conteúdo
  const [autor, setAutor] = useState(""); // Estado para o autor

  const handleSubmit = (e: React.FormEvent) => {
    if (!titulo || !conteudo || !autor) {
      alert("Preencha todos os campos!");
      return;
    }
    post.titulo = titulo;
    post.conteudo = conteudo;
    post.autor = autor;

    e.preventDefault();
    onModificaPost(post);
    setTitulo(''); // Limpa o campo após adicionar
    setConteudo(''); // Limpa o campo após adicionar
    setAutor(''); // Limpa o campo após adicionar
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder= "Titulo do Post"
        value={post.titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Conteúdo do Post"
        value={post.conteudo}
        onChange={e => setConteudo(e.target.value)}
      />
      <br />

      <Input
        type="text"
        placeholder="Autor do Post"
        value={post.autor}
        onChange={e => setAutor(e.target.value)}
      />
      <br />

      <Button type="submit">Adicionar</Button>
    </Form>
  );
};

export default ModificaPost;