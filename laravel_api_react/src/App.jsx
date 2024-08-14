
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Register from './Auth/Register';
import Login from './Auth/Login';
import { AppContext } from './Context/AppContext';
import { useContext } from 'react';
import Create from './Pages/posts/Create';
import Show from './Pages/posts/Show';
import Update from './Pages/posts/Update';
import './App.css';




export default function App() {
  const { user } = useContext(AppContext);

  return <BrowserRouter>
    <Routes>

      <Route path="/" element={<Layout />}>
        {/* As rotas que estão aqui dentro está dentro do layout */}
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/create" element={user ? <Create /> : <Login />} />
        <Route path="/post/:id" element={<Show />} />
        <Route path="/posts/update/:id" element={user ? <Update /> : <Login />} />
        <Route index element={<Home />} />
        {/*  */}
      </Route>

    </Routes>

  </BrowserRouter>
}

