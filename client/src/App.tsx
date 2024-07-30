
import './App.css'

import { Routes, Route } from 'react-router-dom';
import { ShoppingList } from './Components/ShoppingList/ShoppingList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingList />} />
    </Routes>
  )
}

export default App
