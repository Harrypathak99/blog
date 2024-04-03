import React, { useEffect, useRef } from 'react'
import Bloglist from './Bloglist'
import Category from './Category'
import Popular from './Popular'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const myCategory = useRef(null);
  const myPopular = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#category') {
        myCategory.current.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#popular') {
        myPopular.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [location]);

  return (
    <>
        <div className='bg-gray-200 p-5 py-8 pt-20'>
      <Bloglist />
      </div>
      <div id='#category' ref={myCategory}>
      <Category />
      </div>
      <div id='#popular' ref={myPopular}>
      <Popular />
      </div>
      <Footer />
    </>
  )
}

export default Home