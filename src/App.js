import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import ManageKeys from './pages/manageKeys';
import Signup from './pages/signup';

import "./custom.scss";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<Home />} />
    <Route path='/keys' element={<ManageKeys />} />
    <Route path='/signup' element={<Signup />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
