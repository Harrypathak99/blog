import React, { useState, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

const Blogcard2 = () => {
    const [tag, setTag] = useState('');
    const [limit, setLimit] = useState(6);
  
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

    const filteredData = BlogItems.filter(item => tag === '' || item.tag.includes(tag));
    const handleViewMore = () => {
        setLimit(prevLimit => prevLimit + 6);
    }
    const handleViewLess = () => {
      setLimit(prevLimit => 6);
  }
  

  return (
    <>
    <div className='w-[80%] mx-auto p-5 buts flex justify-center overflow-clip'>
        <button onClick={() => setTag('')}>All</button>
        <button onClick={() => setTag('Politics')}>Politics</button>
        <button onClick={() => setTag('Tech')}>Tech</button>
        <button onClick={() => setTag('Social')}>Social</button>
        <button onClick={() => setTag('Celebrity')}>Celebrity</button>
        <button onClick={() => setTag('Movies')}>Movies</button>
        <button onClick={() => setTag('Science')}>Science</button>
    </div>

    <div className='w-[80%] max-sm:w-[96%] px-5 mx-auto h-100 overflow-clip flex flex-wrap'>
    <div className="container">

    <TransitionGroup className="blog-list flex flex-wrap">
    {filteredData.slice(0, limit).map((item, index) =>  {
      const date = new Date(item.date); // replace 'item.date' with your date key
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }); 
      return <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="item"
                    >
    <div className="h-[200px] md:w-[31.3%] sm:w-[96%] mx-[1%] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-2 relative">
        
        <div className="">
        <Link to={`/blog/${item.id}`}>
        <img className="lolo" src={`http://localhost:8000/uploads/${item.file_path}`} alt="An image" />
          <div className="w-fit z-20 absolute top-4 left-4 p-1 px-2 bg-primary-600 tracking-wide text-sm text-white font-semibold rounded-xl shadow-md">
            {item.tag}
          </div>
         

          <div className="w-full absolute bottom-0 p-4 z-10 bg-gradient-to-t from-black">
            <a
              href="#"
              className=" block mt-1 max-md:text-md text-lg leading-tight font-medium text-white hover:underline"
            >
              {item.title}
            </a>
            <p className="mt-2 max-md:text-lg text-md text-slate-100">{formattedDate}</p>
          </div>
          </Link>
        </div>
      </div>
      </CSSTransition> })}
       
    </TransitionGroup>
    <div className='flex justify-center'>
       {limit < filteredData.length && (
        <div className='buts'>
                <button onClick={handleViewMore}>View More</button>
                </div>
            )}
            {limit > 6 && (
        <div className='buts'>
                <button onClick={handleViewLess}>View Less</button>
                </div>
            )}
          </div>
       </div>
       </div>
       </>
  )
}

export default Blogcard2