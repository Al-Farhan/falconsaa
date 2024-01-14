import React from 'react'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const CartItemsCheckoutPage = ({cart, addToCart, removeFromCart, subTotal}) => {
  console.log(cart)
  return (
    <div className="mt-8">
                <div className="my-2 flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {Object.keys(cart).map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={cart[product].itemImg}
                                    alt={cart[product].name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                          {cart[product].name}
                                        
                                      </h3>
                                      <p className="ml-4">
                                        ₹{cart[product].price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {cart[product].color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex flex-col">
                                      <p className="text-gray-500">
                                        Qty {cart[product].qty}
                                      </p>
                                      <p>
                                        {" "}
                                        <FaMinusCircle
                                          onClick={() => {
                                            removeFromCart(
                                              product,
                                              1,
                                              cart[product].price,
                                              cart[product].name,
                                              cart[product].size,
                                              cart[product].variant
                                            );
                                          }}
                                          className="text-pink-500 text-md inline cursor-pointer"
                                        />{" "}
                                        <FaPlusCircle
                                          onClick={() => {
                                            addToCart(
                                              product,
                                              1,
                                              cart[product].price,
                                              cart[product].name,
                                              cart[product].size,
                                              cart[product].variant
                                            );
                                          }}
                                          className="text-pink-500 text-md inline cursor-pointer"
                                        />
                                      </p>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-pink-500 hover:text-pink-400"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                  
                                </div>
                                
                              </li>
                            ))}
                        <div className="sub-total">
                            <h2 className='font-bold'>Subtotal: <span className='font-light'>{subTotal}</span> </h2>
                        </div>                       
                  </ul>
                </div>
              </div>
  )
}

export default CartItemsCheckoutPage