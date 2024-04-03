import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios'

const BlogPost = () => {
  const[tag, setTag] = useState("Politics");
  const[value, setValue] = useState("");
  const currentDate = new Date().toISOString().slice(0,10);
  const [formData, setFormData] = useState({
    title: '',
    date: currentDate,
    like: '0',
    comment: '',
    file: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', value);
    formDataToSend.append('tag', tag);
    formDataToSend.append('like', formData.like);
    formDataToSend.append('comment', formData.comment);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:8000/post/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error uploading file:', error.response);
      setError('Error uploading file. Please try again.');
    }
  };
  // const [value, setValue] = useState("");
  // const [titleData, setTitleData] = useState('');
  // const [tagData, setTagData] = useState('');
  // const [desData, setDesData] = useState('');
  // const [mediaFile, setMediaFile] = useState(null);


  // const handleTitleChange = (e) => {
  //   setTitleData(e.target.value);
  // };
  // const handleTagChange = (e) => {
  //     setTagData(e.target.value);
  //   };
  //   const handleValue = (e) => {
  //     setValue(e.target.value);
  //   };

  // const handleMediaChange = (e) => {
  //   setMediaFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //     const formData = new FormData();
  //     formData.append('title', titleData);
  //     formData.append('content', value);
  //     formData.append('tag', tagData);
  //     formData.append('file', mediaFile);
  //     try {
  //       const response = await axios.post('http://localhost:8000/post', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       console.log('success:', response.data);
  //     } catch (error) {
  //       console.error('Error creating post:', error);
  //     }
  //   }

  return (
    <div className="w-[60%] mx-auto container pt-20">
    <button
        onClick={() => window.history.back()}
        className="flex items-center text-blue-500"
      >
        <FaArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>
    <p className='text-lg font-bold text-center'>Post a Blog</p>
    <form onSubmit={handleSubmit} method='post'>
    <p className='text-md font-semibold'>Title</p>
    <input type='text' placeholder='your title' className='w-full mb-5' name='title' onChange={handleChange}/><br />
    <p className='text-md font-semibold'>Content</p>
    {/* <input type='text' placeholder='your title' className='w-full mb-5' name='content' onChange={handleChange}/><br /> */}
      <MDEditor value={value} onChange={setValue} className='h-96 mb-5'/>
    <p className='text-md font-semibold'>Tag</p>
    {/* <input type='text' placeholder='your title' className='w-full mb-5' name='tag' onChange={handleChange}/><br /> */}
    <select name='tag' value={tag} onChange={handleTag}
    class="peer h-full mb-5 w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 disabled:border-0 disabled:bg-blue-gray-50">
    <option value="Politics">Politics</option>
    <option value="Science">Science</option>
    <option value="Tech">Tech</option>
    <option value="Health">Health</option>
  </select>
  
  <input type="date" name="date" value={formData.date} onChange={handleChange} style={{display: 'none'}} />
  <input type="hidden" name='like' value='0' />
  <input type="hidden" name='comment' value='' />

  <div className='felx justify-end mt-4 w-full'>
    <p className='text-md font-semibold'>Choose an image</p>
    <input type='file' name='file' onChange={handleFileChange} />
    <button className=' bg-blue-500 text-white hover:bg-blue-800 transition-all' type="submit">Submit blog</button>
    </div>
   
    </form>
    </div>
  );
};

export default BlogPost;
