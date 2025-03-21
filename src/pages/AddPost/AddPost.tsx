import React, { useState } from 'react';
import styled from 'styled-components';

interface AddPostProps {
  onAddPost: (titulo:string , conteudo:string, autor:string) => void;
}

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 20px;
`;

// Estilização do formulário
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Estilização dos rótulos
const Label = styled.label`
  font-size: 30px;
  font-weight: bold;
  color: #006d75;
  margin-bottom: 5px;
`;

// Inputs e Textarea com aparência semelhante à imagem
const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ddd; /* Cor cinza como na imagem */
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 12px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ddd; /* Cor cinza como na imagem */
  resize: none;
`;

// Botões
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ color: string }>`
  padding: 24px 40px;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => props.color};

  &:hover {
    opacity: 0.8;
  }
`;

const AddPost: React.FC<AddPostProps> = ({ onAddPost }) => {

  const [titulo, setTitulo] = useState(""); // Estado para o título
  const [conteudo, setConteudo] = useState(""); // Estado para o conteúdo
  const [autor, setAutor] = useState(""); // Estado para o autor

  const handleSubmit = (e: React.FormEvent) => {
    if (!titulo || !conteudo || !autor) {
      alert("Preencha todos os campos!");
      return;
    }

    e.preventDefault();
    onAddPost(titulo,conteudo,autor);
    setTitulo(''); // Limpa o campo após adicionar
    setConteudo(''); // Limpa o campo após adicionar
    setAutor(''); // Limpa o campo após adicionar
  };
  return (
    <Container>
      <h2 style={{ color: '#006d75', fontSize: 40 }}>Criar nova postagem</h2>

      <Form onSubmit={handleSubmit}>
        <Label>Título</Label>
        <Input
          type="text"
          placeholder= "Digite o título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <br />

        <Label>Autor:</Label>
        <Input
          type="text"
          placeholder="Autor do Post"
          value={autor}
          onChange={e => setAutor(e.target.value)}
        />
        <br />

        <Label>Insira aqui o conteúdo da postagem:</Label>
        <Textarea
          placeholder="Conteúdo do Post"
          value={conteudo}
          onChange={e => setConteudo(e.target.value)}
        />
        <br />

        <ButtonsContainer>
        <Button type="submit" color="#2E8B57">
            Publicar
          </Button>
          <Button type="button" color="#D32F2F" onClick={() => { setTitulo(''); setConteudo(''); setAutor(''); }}>
            Cancelar
          </Button>
        </ButtonsContainer>
      </Form>
    </Container>
  );
};

export default AddPost;