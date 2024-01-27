import '@/styles/globals.css'
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BottomNavbar from '../../components/BottomNavbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

import { SearchProvider, CartOpenProvider } from '../../context/Context'

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value: null});
  const [key, setKey] = useState();


  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });

    try {
      if(localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        // saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    }
    catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser) {
      setUser({value: myuser.token, email: myuser.email});
    }
    setKey(Math.random());
    
  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt=0;
    let keys = Object.keys(myCart);
    for(let i = 0; i<keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, itemImg) => {
    toast.success('Item added to cart', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    let newCart = cart;
    if(itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = {qty: 1, price, name, itemImg}
    }

    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemCode, qty, price, name, itemImg) => {
    let newCart = {}
    newCart[itemCode] = {qty: 1, price, name, itemImg};
    
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
  }

  const clearCart = () => {
    setCart({});
    saveCart({}); // setCart take some time to update state. That's why we are writing this code.
    console.log("Cart has been cleared");
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart) {
      newCart[itemCode]["qty"] = cart[itemCode].qty - qty;
    }

    if(newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart);
    saveCart(newCart);
  }

  const logout = () => {
    setTimeout(() => {
    localStorage.removeItem('myuser');
    setUser({value: null});
    setKey(Math.random());
    router.push("/");
    }, 2000);
    
    // toast.success('Successfully Logout', {
    //   position: "top-left",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   });
  }

  return (
    <>
    <LoadingBar
        color='#EC4899'
        height={3}
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
    <SearchProvider>{key &&  <CartOpenProvider> <Navbar user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} logout={logout} /> </CartOpenProvider>}
    {/* <NavbarPrev /> */}
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} {...pageProps} /></SearchProvider>
    <Footer cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <BottomNavbar />
  </>
  )
}
