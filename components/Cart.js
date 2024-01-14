import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoBagCheck  } from "react-icons/io5";
import Link from "next/link";

export default function Cart({
  toggleOpen,
  cart,
  clearCart,
  removeFromCart,
  subTotal,
  addToCart,
}) {
  const [open, setOpen] = useState(toggleOpen);

  console.log("cart on cart page", cart)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {Object.keys(cart).length == 0 && (
                              <div className="empty-cart">
                                Your cart is Empty!
                              </div>
                            )}
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
                                        <a href={product.href}>
                                          {cart[product].name}
                                        </a>
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
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{subTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href="/checkout">
                        <button className="flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-400">
                        <IoBagCheck  className="mr-2 text-white" /> Checkout
                        </button>
                        </Link>
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={clearCart}
                          className="flex items-center justify-center rounded-md border border-transparent w-20 bg-pink-500 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-400"
                        >
                          Clear Cart
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-pink-500 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
