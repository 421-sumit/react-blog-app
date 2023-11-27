import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import About from './components/About';

function App() {
  return (
    <div  >
      <BrowserRouter>
        <Header />
        <div>
          <Routes >
            <Route className="App" path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
