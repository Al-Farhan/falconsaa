import '@/styles/globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // console.log("Hi I am useEffect from _app.js");

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
    
    
  }, [])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt=0;
    let keys = Object.keys(myCart);
    for(let i = 0; i<keys.length; i++) {
      console.log("keys",keys)
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

    console.log("new cart", newCart)
    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemCode, qty, price, name, itemImg) => {
    
    let newCart = {itemCode: {qty: 1, price, name, itemImg}};
    
    // console.log("new cart", newCart)
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

  return (
    <>
    <Navbar key={subTotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} {...pageProps} />
    <Footer cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  </>
  )
}
