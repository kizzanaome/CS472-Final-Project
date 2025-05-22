import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/common/Layout';
import { Home } from './pages/Home';
import ProductDetails from './components/ProductDetails';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id/reviews" element={<ProductDetails />} />

        </Route>
      </Routes>
    </Router>
  )
}
export default App
