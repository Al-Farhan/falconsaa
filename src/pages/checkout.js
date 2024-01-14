import React from "react";
import CartItemsCheckoutPage from "../../components/CartItemsCheckoutPage";
import Link from "next/link";
import { IoBagCheck  } from "react-icons/io5";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  return (
    <>
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
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div class="mb-4">
                <label htmlFor="email" class="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>

          <div className="px-2 w-full">
            <div className="mb-4">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="mx-auto flex my-4">
            <div className="px-2 w-1/2">
              <div class="mb-4">
                <label htmlFor="phone" clssName="leading-7 text-sm text-gray-600">
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex my-4">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            
          </div>
          <div className="mx-auto flex my-4">
          <Link className="px-2 w-1/2" href="/checkout">
            <button className="flex mb-3 items-center justify-center rounded-md border border-transparent bg-pink-500 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-400">
            <IoBagCheck  className="mr-2 text-white" /> Pay ₹{subTotal}
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
