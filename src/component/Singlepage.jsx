import { FaArrowLeft, FaComment, FaShare, FaThumbsUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

const Singlepage = () => {

    const {id} = useParams();
    const[bdata, setBdata] = useState('');
    const [likes, setLikes] = useState(0);
    const [pid, setPid] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentss, setCommentss] = useState([]);
    const [comment, setComment] = useState('');
    const currentDate = new Date().toISOString().slice(0,10);
    const myDiv = useRef(null);

    const handleClick = () => {
        myDiv.current.scrollIntoView({ behavior: 'smooth' });
    };
    
      const cmt = async () => {
      fetch('http://localhost:8000/posts/'+id+'/comments') // replace with your FastAPI endpoint
          .then(response => response.json())
          .then(data => setComments(data));
      };

  useEffect(() => {
    cmt(); // Start polling when component mounts
  }, []);

  const filterData = [...comments].reverse();
   
    useEffect(() => { 
      const blogitems = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/post/'+id);
            const data = await response.json();
            setBdata(data);
            setLikes(data.like);
            setPid(data.id);
          } catch (error) {
            console.error('Error fetching menu items:', error);
          }
        };
        
        blogitems();
      }, [id]);
      const datee = new Date(bdata.date); // replace with your date
        const formattedDate = datee.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
       
        const handleLike = async (e) => {
          e.preventDefault();
          try {
            // Call your API to update the like count on the server
            await axios.put('http://localhost:8000/likes/'+id);
            setLikes(likes + 1);
          } catch (error) {
            console.error('Failed to update like count:', error);
          }
        };
        const handleChange = (e) => {
          
          setComment(e.target.value);
        };
      
        const handleComment = async () => {
          
          const commentData = new FormData();
          commentData.append('content', comment);
          commentData.append('date', currentDate);
       
          try {
            const response = await axios.post(`http://localhost:8000/posts/${pid}/comments`, commentData);
            console.log('successful', response.data);
            setComment('');
            // Handle success
          } catch (error) {
            console.error('Error uploading file:', error.response);
            
          }
        //   const fetchComments = async () => {
        //     fetch('http://localhost:8000/posts/'+id+'/comments') // replace with your FastAPI endpoint
        //         .then(response => response.json())
        //         .then(data => setComments(data));
        //     }
        //   useEffect(() => {
        //     fetchComments();
        // }, []);
          // try {
          //   // Call your API to update the like count on the server
          //   await axios.post('http://localhost:8000/posts/'+id+'/comments', { content: comment, post_id: id, date: currentDate }); 
    
          // } catch (error) {
          //   console.error('Failed to post comment:', error);
          // }
        };
    
   
        
const clength = comments.length;

 const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
    <div className='bg-zinc-100'>
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto pt-20 w-[80%]">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-blue-500"
      >
        <FaArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>
      <div className='flex my-3 justify-between h-56 '>
      <div className='w-7/12'>
      <h1>{bdata.title}</h1>
      <p className="mt-2 max-md:text-lg text-lg text-slate-700 font-semibold">{formattedDate}</p>
      </div>&nbsp;
      <div className='w-5/12'>
      <img className="golo h-56" src={`http://localhost:8000/uploads/${bdata.file_path}`} alt="An image" />
      </div>
      </div>
      <p className='text-lg'>
      <MDEditor.Markdown source={bdata.content} className='bg-inherit' />
      </p>
      
      <div className='w-[80%] mx-auto p-5 buts flex justify-center overflow-clip'>
         <button className='flex items-center' onClick={handleLike}><FaThumbsUp className='text-primary-700 hover:text-white' />&nbsp;{likes} Likes</button>
        <button className='flex items-center' onClick={handleClick}><FaComment className='text-primary-700 hover:text-white' />&nbsp; {clength} Comment</button>
        <button className='flex items-center'><FaShare className='text-primary-700 hover:text-white'/>&nbsp;Share</button>
    </div>

    <div className="w-[50%] p-4 flex flex-col justify-center " ref={myDiv}>
    
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleComment} className="mb-4">
       
        <textarea
          name='content'
          value={comment}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Write a comment..."
        />
        <input type='hidden' name='date' />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      <ul id='commentsection' className='h-[500px] overflow-scroll'>
      
      {filterData.length > 0 ? (
    filterData.map(comment => (
        <li key={comment.id} className="mb-2 p-2 border rounded">
            <p>{comment.content}</p>
        </li>
    ))
) : (
    <p>No comments yet.</p>
)}
      </ul>
    </div>
    </div>
    </div>
    </>
  );
};

export default Singlepage;
