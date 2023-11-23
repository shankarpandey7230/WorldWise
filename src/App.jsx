import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Product, Pricing, PageNotFound, AppLayout } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />

        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
