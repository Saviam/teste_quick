import React from 'react';
import './App.css';
import Posts from './components/Posts'; 
import Auth from './components/Auth'
import Comments from './components/Comments'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Teste QuickDev</h1>
      </header>
      <main>
        <Auth />
        <Comments />
        <Posts />
      </main>
    </div>
  );
}

export default App;
