import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout';
import ProductList from './components/ProductList';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App
