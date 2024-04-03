import React from 'react'
import Blogcard from './Blogcard'
import Blogvertical from './Blogvertical'
import img1 from ".././assets/images/img_1.jpg";
import Popular from './Popular';

const Bloglist = () => {
  return (
    <div className='w-[80%] max-sm:w-[96%] mx-auto h-100 overflow-clip flex flex-wrap'>
    
        <Blogcard />
        
    </div>
  )
}

export default Bloglist