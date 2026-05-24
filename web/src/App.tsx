import { Route, Routes } from 'react-router';
import HomePage from './pages/home.page';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/books' element={<HomePage />} />
      <Route path='/books/:id' element={<HomePage />} />
    </Routes>
  )
}

export default App;
