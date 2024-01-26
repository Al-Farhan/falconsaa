import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import { useSearch } from '../../context/Context';

const Search = () => {

    const {queryProducts} = useSearch();
    console.log(queryProducts);

    return (
        <>
        <Head>
            <title>Buy medical books from Falconsaa. Fulfill the dream of your insides falcon.</title>
            <meta
              name="description"
              content="Falconsaa - An ecommerce platform that fulfills the need of books to all the needfull aspirants."
            />
          </Head>
        <div className="bg-white mt-2 min-h-screen">
          {(queryProducts.length == 0) ? <div className="text-lg text-center text-gray-500 h-44">Sorry there is no such products available.</div> :
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Search Results
            </h2>
    
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {queryProducts.map((product) => (
                <div key={product._id} className="group relative lg:w-64">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 h-56 ">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full p-2 rounded-xl"
                    />
                  </div>
                  <div className="mt-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-md text-gray-700">
                        <Link href={`/product/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {(product.title).slice(0, 40)}...
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
        </>
      );
}

export default Search