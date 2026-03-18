import './App.css';
import AlgoDeck from './components/AlgoDeck';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/algodeck/:id" element={<AlgoDeck />} />
    </Routes>
  );
}

export default App