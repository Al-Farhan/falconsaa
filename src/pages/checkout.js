import React, { useEffect, useState } from "react";
import CartItemsCheckoutPage from "../../components/CartItemsCheckoutPage";
import Link from "next/link";
import { IoBagCheck } from "react-icons/io5";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({
  cart,
  clearCart,
  addToCart,
  removeFromCart,
  subTotal
}) => {

  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({value: null})

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('myuser'));
    if(subTotal==0) {
      router.push("/");
    }
    if(user.token) {
      setUser(user);
      setEmail(user.email);
    }
  }, [])

  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pincodes = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/pincode`
        );
        let pinsJson = await pincodes.json();
        if (Object.keys(pinsJson).includes(e.target.value)) {
          setCity(pinsJson[e.target.value][0]);
          setState(pinsJson[e.target.value][1]);
        } else {
          setCity("");
          setState("");
        }
      } else {
        setCity("");
        setState("");
      }
    }

    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    // Get a transaction token
    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name,
      address,
      pincode,
      phone,
    };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let txnRes = await a.json();
    // console.log(txnRes);

    if (txnRes.success) {
      let txnToken = txnRes.txnToken;

      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid /* update order id */,
          token: txnToken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: subTotal /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      console.log(txnRes.error);
      clearCart();

      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
    <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      />

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <div className="container m-auto sm:grid grid-cols-2 gap-10">
        <div className="checkout-information">
          <h1 className="font-bold text-xl">1. Delivery Details</h1>
          <div className="mx-auto flex my-4">
            <div className="px-2 w-1/2">
              <div class="mb-4">
                <label htmlFor="name" class="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div class="mb-4">
                <label htmlFor="email" class="leading-7 text-sm text-gray-600">
                  Email
                </label>
                {user && user.token ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    readOnly={true}
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                ) : (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="px-2 w-full">
            <div className="mb-4">
              <label
                htmlFor="address"
                className="leading-7 text-sm text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={handleChange}
                id="address"
                name="address"
                class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="mx-auto flex my-4">
            <div className="px-2 w-1/2">
              <div class="mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Your 10 digit whatsapp phone number"
                  value={phone}
                  onChange={handleChange}
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={pincode}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex my-4">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex my-4">
            <Link className="px-2 w-1/2" href="/checkout">
              <button
                disabled={disabled}
                onClick={initiatePayment}
                className="disabled:bg-pink-300 flex mb-3 items-center justify-center rounded-md border border-transparent bg-pink-500 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-400"
              >
                <IoBagCheck className="mr-2 text-white" /> Pay ₹{subTotal}
              </button>
            </Link>
          </div>
        </div>

        <div className="products-information mx-3 mr-32">
          <h1 className="font-bold text-xl">2. Cart Items</h1>
          <CartItemsCheckoutPage
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            subTotal={subTotal}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
