import React from 'react'
import './header.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { Input, Badge, message } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { searchProduct } from "../../redux/searchSlice";
import { 
  SearchOutlined, 
  HomeOutlined, 
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {removeUser} from "../../redux/userSlice";

const Header = () => {
  const {user} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const logout = () => {
    if(window.confirm('i you sure?')){
      if(localStorage.getItem('user')){
        dispatch(removeUser());
        message.success('bye bye');
        
        setTimeout(() => {
          navigate("/login");
        }, 1000)
      }
    }
  }

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between item-center gap-10">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold md-text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input 
            onClick={() => {
              pathname !== '/' && navigate('/');
            }}
            onChange={(e) => {
              dispatch(searchProduct(e.target.value.toLowerCase()))
            }}
            size="large" 
            placeholder="search" 
            prefix={<SearchOutlined />} 
            className="rounded-full max-w-[800px]"
          />
        <br />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link to="/" className={`${pathname === '/' && 'active'} menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`}>
              <HomeOutlined className="md:text-2xl"/>
              <span className="md:text-xs text-[10px]">Home</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0,0]} className="md:flex hidden">
            <Link to="/cart" className={`${pathname === '/cart' && 'active'} menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`}>
                <ShoppingCartOutlined className="md:text-2xl"/>
                <span className="md:text-xs text-[10px]">Cart</span>
            </Link>
          </Badge>
          <Link to="/bills" className={`${pathname === '/bills' && 'active'} menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`}>
              <CopyOutlined className="md:text-2xl"/>
              <span className="md:text-xs text-[10px]">Bills</span>
          </Link>
          
          {user.status === 'admin' &&         
          <Link to="/customers" className={`${pathname === '/customers' && 'active'} menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`}>
              <UserOutlined className="md:text-2xl"/>
              <span className="md:text-xs text-[10px]">Users</span>
          </Link>
          }

          {user.status === 'admin' &&         
          <Link to="/statistic" className={`${pathname === '/statistic' && 'active'} menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`}>
              <BarChartOutlined className="md:text-2xl"/>
              <span className="md:text-xs text-[10px]">Stats</span>
          </Link>
          }

          <Link className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`} onClick={logout}>
              <LogoutOutlined className="md:text-2xl"/>
              <span className="md:text-xs text-[10px]">log out</span>
          </Link>
        </div>
        <Badge count={cart.cartItems.length} offset={[0,-1]} className="md:hidden flex">
            <Link to="/cart" className={`${pathname === '/cart' && 'active'} menu-link flex flex-col hover:text-[#40a9ff] transition-all gap-y-[2px]`}>
                <ShoppingCartOutlined className="text-2xl"/>
                <span className="md:text-xs text-[10px]">Cart</span>
            </Link>
          </Badge>
      </header>
    </div>
  )
}

export default Header;