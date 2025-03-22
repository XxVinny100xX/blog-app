import  { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPosts, deletePost } from './api';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import AddPost from './pages/AddPost/AddPost';
import ModificaPost from './pages/ModificaPost/ModificaPost';
import Login from './pages/Login/Login';
import PostDetail from './pages/LerPost/LerPost';
import PostList from './pages/PostList/PostList';
import { Post } from './types';
import './App.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null); // Limpa erros anteriores
    try {
      const data = await getPosts();
      if (data.length > 0) {
        setPosts(data);
      } else {
        setError(data.error);
      }
    } catch(error) {
      console.error('Erro ao buscar posts:', error);
      setError('Erro ao buscar posts. Tente novamente mais tarde.');
      setMensagem('Erro ao buscar posts. Tente novamente mais tarde.');
    }
    finally{
      setLoading(false);
    };
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
    setPosts(currentPosts => currentPosts.filter(post => post._id !== id));
    setMensagem('Post deletado com sucesso!');    
  };

  const handlePostCreate = useCallback(() => {
    fetchPosts();
    setMensagem('Post criado com sucesso!');
  }, [fetchPosts]);

  if (loading) {
    return <div>Carregando posts...</div>; // Mensagem de carregamento
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erro: {error}</div>; // Mensagem de erro
  }

  return (
    <Router>
      <div className="app-blog">
        <Header />
        {mensagem && <div className="mensagem">{mensagem}</div>}
        <MainContent>
          <Routes>
            <Route path="/" element={
              <>
                <PostList posts={posts} onDeletePost={handleDeletePost} />
              </>
            } />
            <Route path="/criar"          element={<AddPost onPostCreate={handlePostCreate} />} />
            <Route path="/post/:id"       element={<PostDetail />} />
            <Route path="/modificar/:id"  element={<ModificaPost posts={posts} />} />
            <Route path="/login-docente"  element={<Login />} />
          </Routes>
        </MainContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;