import Link from "next/link";
import React from "react";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
import mongoose from "mongoose";

const Medical = ({products}) => {
  // console.log(products);


  return (
    <div className="bg-white mt-2">
      {(products.length == 0) ? <div className="text-lg text-center text-gray-500 h-44">Sorry product will be available soon.</div> :
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore Medical Books
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full p-2 rounded-xl"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-md text-gray-700">
                    <Link href={`/product/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div>
                  <p className="text-md font-medium text-gray-900 ">
                    Sale price: {product.price}
                  </p>
                  <p className="text-md font-medium text-gray-900 line-through">
                    MRP: {product.mrp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
}
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: "Medical"});

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Medical;
