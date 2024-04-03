import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './component/Header'
import Bloglist from './component/Bloglist'
import Category from './component/Category'
import Blogcard from './component/Blogcard'
import { useEffect, useState } from 'react'
import Singlepost from './component/Singlepage'
import Home from './component/Home';
import Blogpost from './component/Blogpost';


function App() {
  const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY && window.scrollY > 35) {
                // If scrolling down, hide the navbar
                setShow(false);
            } else {
                // If scrolling up, show the navbar
                setShow(true);
            }
            // Remember the current page location for the next move
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            // Cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

  return (
    <>
        <Router>
        <nav className={`fixed w-full z-30 transition-transform duration-300 transform ${show ? 'translate-y-0' : '-translate-y-full'}`}>
    <Header />
        </nav>
          <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path="/blog/:id" exact element={<Singlepost />} />
          <Route path="/blogpost" exact element={<Blogpost />} />
          </Routes>
        </Router>
      
      
    </>
  )
}

export default App
