import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const AlgoDeck = lazy(() => import('./components/AlgoDeck'));

const App = () => {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algodeck/:id" element={<AlgoDeck />} />
      </Routes>
    </Suspense>
  );
}

export default App