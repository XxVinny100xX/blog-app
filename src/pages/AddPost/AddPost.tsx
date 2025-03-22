import React, { useState } from 'react';
import styled from 'styled-components';
import { addPost } from '../../api';
import { useNavigate } from 'react-router-dom';

interface AddPostProps {}

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

const AddPost: React.FC<AddPostProps> = ({}) => {

  const [titulo, setTitulo] = useState(""); // Estado para o título
  const [conteudo, setConteudo] = useState(""); // Estado para o conteúdo
  const [autor, setAutor] = useState(""); // Estado para o autor
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!titulo || !conteudo || !autor) {
      setError("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    const newPost = {titulo, conteudo, autor};

    try{  
      const data = await addPost(newPost);
      if (data.success === false) {
        setError(data.error);
      } else {
        navigate('/');
      }
    } catch(error) {
      console.error('Erro ao criar post:', error);
      setError('Erro ao criar post. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 style={{ color: '#006d75', fontSize: 40 }}>Criar nova postagem</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
        <Button type="submit" color="#2E8B57" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar'}
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