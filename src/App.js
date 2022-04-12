
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import TopicsPage from './components/TopicsPage'
import {Route, Routes} from 'react-router-dom'
import ArticlePage from './components/ArticlePage';
import NotFoundPage from './components/NotFoundPage'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="*" element={<Main/>}/>
        <Route path="/topic/" element={<Main/>}/>
        <Route path="/article/" element={<Main/>}/>
        <Route path="/topic/:topic" element={<TopicsPage/>}/>
        <Route path="/article/:post_id" element={<ArticlePage/>}/>
        <Route path="/article/no-post-found" element={<NotFoundPage/>}/>
        <Route path="/topic/no-topic-found" element={<NotFoundPage/>}/>
      </Routes>
       
    </div>
  );
}

export default App
