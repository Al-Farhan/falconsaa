import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Order from '../../models/Order';
import mongoose from "mongoose";
import Link from 'next/link';

const MyOrder = ({order, clearCart}) => {

  const products = order.products;
  const router = useRouter();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    if(router.query.clearCart == 1) {
      clearCart();
    }

    const date = new Date(order.createdAt);
    setDate(date);

    const time = new Date(order.createdAt);
    setTime(time)
  }, [])
  

  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">Falconsaa</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
        
        <p className="leading-relaxed mb-4">Your order has been successfully placed. Your payment status is {order.status}</p>
        <p className="leading-relaxed mb-4">Order created on: {date && date.toLocaleDateString("en-IN", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
        <p className="leading-relaxed mb-4">@: {time && time.toLocaleTimeString()}</p>

        <div className="flex mb-4 py-2">
          <a className="flex-grow  py-2 text-lg text-center">Item Description</a>
          <a className="flex-grow py-2 text-lg text-center">Quantity</a>
          <a className="flex-grow py-2 text-lg text-center">Item Total</a>
        </div>

        <div className=''>

        {Object.keys(products).map((item) => ( 
          <div key={item} className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500 w-36">{products[item].name}</span>  
          <span className="m-auto text-gray-900">{products[item].qty}</span>
          <span className="m-auto text-gray-900">₹{products[item].price}</span>
        </div>
        ))}

        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">Subtotal:  ₹{order.amount}</span>
          <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
          
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
    </div>
  </div>

          {/* This table is used in future to display orders details */}
  <div className="relative overflow-x-auto my-6 shadow-lg bg-gray-100 sm:rounded-lg sm:mx-20 min-h-screen">
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="text-xs text-black uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                #Order Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((item) => ( */}
            <tr className="bg-white border-b hover:bg-gray-200 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
              >
                #farhan
              </th>
              <td className="px-6 py-4">item</td>
              <td className="px-6 py-4">thi</td>
              <td className="px-6 py-4">₹hello</td>
              <td className="px-6 py-4 text-right">
                <Link href={'/'} legacyBehavior>
                <a 
                  className="font-medium text-pink-500 hover:underline"
                >
                  Details
                </a>
                </Link>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
</section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default MyOrder