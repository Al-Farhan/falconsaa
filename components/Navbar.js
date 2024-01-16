import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import Cart from "./Cart";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Medical", href: "/medical", current: true },
  { name: "Dental", href: "/dental", current: false },
  { name: "Pharmacy", href: "/pharmacy", current: false },
  { name: "Nursing", href: "/nursing", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  logout,
}) {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);

  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => {
    console.log("Clicked on cart");
    setOpenCart((prev) => {
      if (prev) return !prev;
      else return !prev;
    });
  };

  const ref = useRef();

  return (
    <Disclosure as="nav" className="shadow-md sticky top-0 bg-white z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <h1 className='text-2xl text-white'><i>Falconsaa</i></h1> */}
                  <Link href={"/"}>
                    <img
                      className="h-12 w-auto"
                      src="/falconsaalogo4.png"
                      alt="falconsaa"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 py-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        // className={classNames(
                        //   item.current ? 'bg-pink-500 text-white' : 'text-black hover:bg-pink-500 hover:text-white',
                        //   'rounded-md px-3 py-2 text-sm font-medium'
                        // )}

                        className="rounded-md px-3 py-2 text-md font-medium hover:bg-pink-500 hover:text-white"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={toggleCart}
                  type="button"
                  className="relative rounded-full  p-1 focus:outline-none focus:ring-2focus:ring-offset-2 "
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  <div ref={ref} className="cart">
                    <FaShoppingCart className="text-2xl text-pink-500 hover:text-pink-400" />
                  </div>
                  {openCart ? (
                    <Cart
                      toggleOpen={openCart}
                      cart={cart}
                      clearCart={clearCart}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      subTotal={subTotal}
                    />
                  ) : null}

                  {/* <CiShoppingCart className='text-2xl text-pink-500 hover:text-black' /> */}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <MdAccountCircle className="text-2xl text-pink-500" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!user.value ? (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={logout}
                                href={""}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
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
                                  theme="colored"
                                />
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-pink-500 text-white"
                      : "text-black hover:bg-pink-500 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium hover:bg-pink-500 hover:text-white"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
