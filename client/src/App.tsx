import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/ProductList'

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
