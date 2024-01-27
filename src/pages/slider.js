import React from "react";
import { Carousel } from 'flowbite-react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Slider = () => {
  return (
    <>
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 rounded-none mt-6">
      <Carousel pauseOnHover slideInterval={5000} leftControl={<IoIosArrowBack className="text-3xl text-black rounded-full bg-gray-100 hover:bg-gray-200"/>} rightControl={<IoIosArrowForward className="text-3xl text-black rounded-full bg-gray-100 hover:bg-gray-200" />} className="rounded-none"> 
      <img src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
        <img className="rounded-none" src="/carosual1.png" alt="..." />
        <img src="https://images.pexels.com/photos/45717/pexels-photo-45717.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
        <img src="/carosual2.png" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
      </div>
    </>
  );
};

export default Slider;
