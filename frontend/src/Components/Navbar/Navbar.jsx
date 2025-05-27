import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  let [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='nav'>
      <Link to='/' onClick={() => setMenu("shop")} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SCMS CANTEEN</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="menu" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/' style={{ textDecoration: 'none' }}>HOME</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => setMenu("lunch")}><Link to='/lunch' style={{ textDecoration: 'none' }}>LUNCH</Link>{menu === "lunch" ? <hr /> : null}</li>
        <li onClick={() => setMenu("snacks")}><Link to='/snacks' style={{ textDecoration: 'none' }}>SNACKS</Link>{menu === "snacks" ? <hr /> : null}</li>
        <li onClick={() => setMenu("drinks")}><Link to='/drinks' style={{ textDecoration: 'none' }}>DRINKS</Link>{menu === "drinks" ? <hr /> : null}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <>
            <Link to="/userorder">
              <button >Your Orders</button>
            </Link>
            <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>
              Logout
            </button>
          </>
        ) : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
