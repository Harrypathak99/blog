import React from 'react'
import img1 from ".././assets/images/img_1.jpg";

const Cardsample = () => {
  return (
    <div className='h-[330px] p-4'>
      <div className="h-[300px] md:w-full sm:w-[96%] mx-[2%] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-2 relative">
        
        <div className="">
        
        <img className="h-[310px] object-cover" src={img1} alt="An image" />
          <div className="w-fit z-20 absolute top-4 left-4 p-1 px-2 bg-primary-600 tracking-wide text-sm text-white font-semibold rounded-xl shadow-md">
            Science
          </div>
         

          <div className="w-full absolute bottom-0 p-4 z-10 bg-gradient-to-t from-black">
            <a
              href="#"
              className=" block mt-1 max-md:text-md text-lg leading-tight font-medium text-white hover:underline"
            >
              Any thing can be here
            </a>
            <p className="mt-2 max-md:text-lg text-md text-white">February 10, 2022</p>
          </div>
          
        </div>
      </div>
      </div>
  )
}

export default Cardsample