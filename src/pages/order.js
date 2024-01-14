import React from 'react'

const Order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">Falconsaa</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #8945</h1>
        
        <p className="leading-relaxed mb-4">Your order has been successfully placed.</p>

        <div className="flex mb-4 py-2">
          <a className="flex-grow  py-2 text-lg px-1 text-center">Item Description</a>
          <a className="flex-grow py-2 text-lg px-1 text-center">Qty</a>
          <a className="flex-grow py-2 text-lg px-1 text-center">Item Total</a>
        </div>

        <div className=''>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Medical text book</span>  
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">₹499</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Nursing text book</span>
          <span className="ml-auto text-gray-900">2</span>
          <span className="ml-auto text-gray-900">₹466</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className=" text-gray-500">Pharmacy text bo</span>
          <span className="ml-auto text-gray-900">4</span>
          <span className="ml-auto text-gray-900">₹4</span>
        </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">Subtotal:  ₹58.00</span>
          <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
          
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
    </div>
  </div>
</section>
  )
}

export default Order