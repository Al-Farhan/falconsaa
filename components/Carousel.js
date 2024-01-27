import React from "react";
import { Carousel } from 'flowbite-react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const MyCarousel = () => {
  return (
    <>
    <div className="h-56 sm:h-64">
      <Carousel pauseOnHover slideInterval={3000} leftControl={<IoIosArrowBack className="text-3xl text-black rounded-full bg-gray-100 hover:bg-gray-200"/>} rightControl={<IoIosArrowForward className="text-3xl text-black rounded-full bg-gray-100 hover:bg-gray-200" />} className="rounded-none"> 
      
        <img className="h-56" src="/carosual1.png" alt="Falconsaa" />
        <img className="h-56" src="/carosual2.png" alt="Falconsaa" />
        <img className="h-56" src="/carosual3.png" alt="Falconsaa" />
        <img className="h-56" src="/carosual4.png" alt="Falconsaa" />
      </Carousel>
      </div>
    </>
  );
};

export default MyCarousel;
