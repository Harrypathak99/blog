import React, { useEffect, useState } from "react";
import img1 from ".././assets/images/img_1.jpg";
import img2 from ".././assets/images/img_2.jpg";
import img3 from ".././assets/images/img_3.jpg";
import img4 from ".././assets/images/img_4.jpg";
import { Link } from "react-router-dom";

const Blogcard = () => {
  const data = [
    {
        title: 'The 20 Biggest Fintech Companies In America 2019',
        content: ['Subitem 1', 'Subitem 2'],
        date: ['January 25, 2024'],
        tag: ['Business'],
        image: [img1],
        id: [1]
    },
    {
        title: 'The AI magically removes moving objects from videos',
        content: ['Subitem 1', 'Subitem 2', 'Subitem 3'],
        date: ['July 19, 2019'],
        tag: ['Tech'],
        image: [img2],
        id: [2]
    },
    {
        title: 'The Un president calls for the meeting',
        content: ['Subitem 1'],
        date: ['March 09, 2022'],
        tag: ['Politics'],
        image: [img3],
        id: [3]
    },
    {
        title: 'Nishita Mangal is looking beautiful in this outfit.',
        content: ['Subitem 1', 'Subitem 2', 'Subitem 3'],
        date: ['October 15, 2021'],
        tag: ['Celebrity'],
        image: [img4],
        id: [4]
    }
];
const [BlogItems, setBlogItems] = useState([]);
useEffect(() => { 
const blogitems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/getpost');
      const data = await response.json();
      setBlogItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  blogitems();
}, []);
const reversedData = [...BlogItems].reverse();

  return (
    <>
    <div className="container w-[60%]">
    <div className='flex flex-wrap'>
    {reversedData.slice(0,4).map((item, index) => {
      const date = new Date(item.date); // replace 'item.date' with your date key
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }); 
      return <div key={index} className="h-[184.5px] md:w-[46%] sm:w-[96%] mx-[2%] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-2 relative">
        
        <div className="">
        <Link to={`/blog/${item.id}`}>
        <img className="lolo" src={`http://localhost:8000/uploads/${item.file_path}`} alt="An image" />
          <div className="w-fit z-20 absolute top-4 left-4 p-1 px-2 bg-primary-600 tracking-wide text-sm text-white font-semibold rounded-xl shadow-md">
            {item.tag}
          </div>
         

          <div className="w-full absolute bottom-0 p-4 z-10 text-white bg-gradient-to-t from-black">
            
              {item.title}
            
            <p className="mt-2 max-md:text-lg text-md text-white">{formattedDate}</p>
          </div>
          </Link>
        </div>
      </div>
      
    })}
    </div>
    </div>
  

    <div className='w-[40%]'>
    <div className="w-[96%] h-96 mx-[2%] bg-red-500 rounded-xl shadow-md m-2 overflow-hidden relative">

    {reversedData.slice(4,5).map((item, index) => {
      const date = new Date(item.date); // replace 'item.date' with your date key
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }); 
      return <Link key={index} to={`/blog/${item.id}`}>
      <img className="lolo" src={`http://localhost:8000/uploads/${item.file_path}`} alt="An image" />
        <div className="bg-red-200">
          
          <div className="w-fit absolute top-4 left-4 p-1 px-2 bg-rose-500 tracking-wide text-sm text-white font-semibold rounded-xl shadow-md">
            Nature
          </div>

          <div className="w-full absolute bottom-0 p-4 z-10 text-white bg-gradient-to-t from-black">
            
              {item.title}
            
            <p className="mt-2 text-slate-100">{formattedDate}</p>
          </div>
        </div>
        </Link>
    })}
      </div>
      </div>

    </>
  );
};

export default Blogcard;
