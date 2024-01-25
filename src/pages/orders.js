import mongoose from "mongoose";
import Order from "../../models/Order";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token }),
      });

      let res = await a.json()
      setOrders(res.orders);
    };

    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <>
    <Head>
        <title>Orders Falconsaa. Fulfill the dream of your insides falcon.</title>
        <meta
          name="description"
          content="Falconsaa - An ecommerce platform that fulfills the need of books to all the needfull aspirants."
        />
      </Head>
      <h1 className="text-2xl font-bold mx-10 sm:mx-20 mt-12">My Orders</h1>

      <div className="relative overflow-x-auto my-6 shadow-lg bg-gray-100 sm:rounded-lg sm:mx-20 min-h-screen">
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="text-xs text-black uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                #Order Number
              </th>
              <th scope="col" className="px-6 py-3">
                #Date
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
            {orders.map((item) => (
            <tr key={item.orderId} className="bg-white border-b hover:bg-gray-200 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
              >
                #{item.orderId}
              </th>
              <td className="px-6 py-4">{item.createdAt.slice(0, 10)}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">₹{item.amount}</td>
              <td className="px-6 py-4 text-right">
                <Link href={`/order?id=${item._id}`} legacyBehavior>
                <a 
                  className="font-medium text-pink-500 hover:underline"
                >
                  Details
                </a>
                </Link>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
