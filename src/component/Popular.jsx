import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';


const Popular = () => {
      const [datas, setDatas] = useState([]);

      useEffect(() => { 
        const blogitems = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/getpost');
              const data = await response.json();
              const sortedData = data.sort((a, b) => b.like - a.like);
              setDatas(sortedData);
              console.log('Fetched Data:', data);
            } catch (error) {
              console.error('Error fetching menu items:', error);
            }
          };
      
          blogitems();
        }, []);
        var settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        };
      
  return (
    <div className='w-[80%] mx-auto justify-center mt-4' id='popular'>
    
    <p className='text-2xl font-bold ml-4 mb-4'>Most popular Blogs</p>
    <div className='flex-wrap flex-col'>
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {datas.slice(0,5).map((item, index) => {
      const date = new Date(item.date); // replace 'item.date' with your date key
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }); 
      return <SwiperSlide><div className='w-full m-0 bg-zinc-100'>
      <div key={index} className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl relative">
        
        <div className="h-[300px]">
        <Link to={`/blog/${item.id}`}>
        <img className="lolo" src={`http://localhost:8000/uploads/${item.file_path}`} alt="An image" />
          <div className="w-fit z-20 absolute top-4 left-4 p-1 px-2 bg-primary-600 tracking-wide text-sm text-white font-semibold rounded-xl shadow-md">
            {item.tag}
          </div> 
         

          <div className="w-full absolute bottom-0 p-4 max-md:text-lg text-md z-10 text-white bg-gradient-to-t from-black">
            
              {item.title}
            
            <p className="mt-2 max-md:text-lg text-md text-white">{formattedDate}</p>
          </div>
          </Link>
        </div>
        
      </div>
      <div className='shadow'>
      <p className='text-slate-900 mx-3 mt-2 limited-lines font-semibold'>{item.content}</p>
      <div className='flex flex-wrap justify-between mx-3 mt-2 pb-4'>
        <div><button className='bg-slate-200 shadow' disabled>{item.like} Likes</button></div>
        <div><button className='bg-primary-500 shadow text-white' >Read more</button></div>
      </div>
      </div>
      </div>
      </SwiperSlide>
    })}
    </Swiper>
   
      </div>
      

{datas.length === 0 && ( // Display a message if no data is fetched
  <p className='text-black'>No data found.</p>
)}

      
    </div>
    
  )
}

export default Popular