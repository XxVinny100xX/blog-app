import  { useState,useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './api';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import AddPost from './pages/AddPost/AddPost';
import ModificaPost from './pages/ModificaPost/ModificaPost';
import PostDetail from './pages/LerPost/LerPost';
import PostList from './pages/PostList/PostList';
import taskReducer from './reducers/taskReducer';
import { Post } from './types';
import './App.css';

const initialState = { posts: [] as Post[] };

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    api.get('/posts')
      .then(response => {
        dispatch({ type: 'SET_POST', payload: response.data });
      })
      .catch(error => {
        console.error('Erro ao obter Posts:', error);
      });
  }, []);

  const addpost= (titulo:string, conteudo:string, autor:string) => {
    api.post('/posts', { titulo:titulo , conteudo:conteudo, autor:autor })
      .then(response => {
        dispatch({ type: 'ADD_POST', payload: response.data });
        //Exibir mensagem de Sucesso
        setMensagem('Post Criado com Sucesso');
        setTimeout(() => { setMensagem('');}, 3000);
      })
      .catch(error => {
        console.error('Erro ao Criar Post:', error);
        setMensagem('Erro ao Criar Post');
        setTimeout(() => { setMensagem('');}, 3000);
      });
  };

  const removePost = (postId: number) => {
    api.delete(`/posts/${postId}`)
      .then(() => {
        dispatch({ type: 'REMOVE_POST', payload: postId });
        setMensagem('Post  com Sucesso');
        setTimeout(() => { setMensagem('');}, 3000);
      })
      .catch(error => {
        console.error('Erro ao Remover Post:', error);
        setMensagem('Erro ao Remover Post');
        setTimeout(() => { setMensagem('');}, 3000);
      });
  };

  const atualizaPost = (atPost: Post) => {
    const post = state.posts.find( (post:Post) => post.id === atPost.id);
    if (post) {
      const updatedPost: Post = {
        ...post,
        titulo: atPost.titulo,
        conteudo: atPost.conteudo,
        autor: atPost.autor
      };
      api.put(`/posts/${atPost.id}`, updatedPost)
        .then(() => {
          dispatch({ type: 'TOGGLE_POST', payload: updatedPost });
          setMensagem('Post Atualizado com Sucesso');
          setTimeout(() => { setMensagem('');}, 3000);
        })
        .catch(error => {
          console.error('Erro ao Atualizar Post:', error);
          setMensagem('Erro ao Atualizar Post');
          setTimeout(() => { setMensagem('');}, 3000);
        });
    }
  };

  return (
    <Router>
      <div className="app-blog">
        <Header />
        {mensagem && <div className="mensagem">{mensagem}</div>}
        <MainContent>
          <Routes>
            <Route path="/" element={
              <>
                <h1>Postagens</h1>
                <PostList posts={state.posts} />
              </>
            } />
            <Route path="/criar" element={<AddPost onAddPost={addpost} />} />
            <Route path="/post/:id" element={<PostDetail posts={state.posts} />} />        
            <Route path="/modificar" element={<ModificaPost post={state.posts} onModificaPost={atualizaPost} />} /> 
          </Routes>
        </MainContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;