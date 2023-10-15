import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Bill from './pages/Bill';
import Customer from './pages/Customer';
import Statistic from './pages/Statistic';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <RouterControl status="user">
            <Home/>
          </RouterControl>
        }
        />
        <Route path="/cart" element={
          <RouterControl status="user">
            <Cart/>
          </RouterControl>
        }/>
        <Route path="/bills" element={
          <RouterControl status="user">
            <Bill/>
          </RouterControl>
        }/>
        <Route path="/customers" element={
          <RouterControl status="admin">
            <Customer/>
          </RouterControl>
        }/>
        <Route path="/statistic" element={
          <RouterControl status="admin">
            <Statistic/>
          </RouterControl>
        }/>
        <Route path="/products" element={
          <RouterControl status="admin">
            <Products/>
          </RouterControl>
        }/>
        <Route path="/register" element={
          <Register/>
        }/>
        <Route path="/login" element={
          <Login/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouterControl = ({children, status = 'user'}) => {
  if(localStorage.getItem('user')){
    const user = JSON.parse(localStorage.getItem('user'));
    if(status === 'admin' && user.status === 'admin'){
      return children;

    } else if(status === 'admin' && user.status !== 'admin'){
      return <Navigate to="/"/>

    } else{
      return children;
    }
  }else{
    return <Navigate to="/login"/>
  }
}
