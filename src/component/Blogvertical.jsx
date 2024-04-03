import React from "react";
import img1 from ".././assets/images/img_1.jpg";

const Blogvertical = () => {
  return (
    
      <div className="w-[96%] h-96 mx-[2%] bg-red-500 rounded-xl shadow-md m-2 overflow-hidden relative">
      <img className="lolo" src={img1} alt="An image" />
        <div className="bg-red-200">
          
          <div className="w-fit absolute top-4 left-4 p-1 px-2 bg-rose-500 tracking-wide text-sm text-white font-semibold rounded-xl shadow-md">
            Nature
          </div>

          <div className="w-full absolute bottom-0 p-4 z-10 bg-gradient-to-t from-black">
            <a
              href="#"
              className=" block mt-1 text-2xl leading-tight font-medium text-white hover:underline"
            >
              The 20 Biggest Fintech Companies In America 2019
            </a>
            <p className="mt-2 text-slate-100">February 12, 2019</p>
          </div>
        </div>
      </div>
    
  );
};

export default Blogvertical;
