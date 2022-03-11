
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import TopicsPage from './components/TopicsPage'
import {Route, Routes} from 'react-router-dom'
import ArticlePage from './components/ArticlePage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/topic/:topic" element={<TopicsPage/>}/>
        <Route path="/article/:article_id" element={<ArticlePage/>}/>
      </Routes>
       
    </div>
  );
}

export default App
