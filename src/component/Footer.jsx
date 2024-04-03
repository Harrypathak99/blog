import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 sm:mt-10 pt-10">
    <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
        {/* <!-- Col-1 --> */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* <!-- Content --> */}
            <p className="text-white uppercase mb-2">Column 1</p>
            <ul className="p-0 text-gray-400 text-sm">
                <li className="mt-2">
                    <a href="/">Link 1</a>
                </li>
                <li className="mt-2">
                    <a href="/">Link 2</a>
                </li>
            </ul>
        </div>
        {/* <!-- Col-2 --> */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* <!-- Content --> */}
            <p className="text-white uppercase mb-2">Column 2</p>
            <ul className="p-0 text-gray-400 text-sm">
                <li className="mt-2 inline-flex">
                    <a href="/">Link 1</a>
                </li>
                <li className="mt-2 inline-flex">
                    <a href="/">Link 2</a>
                </li>
            </ul>
        </div>
        {/* <!-- Col-3 --> */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* <!-- Content --> */}
            <p className="text-white uppercase mb-2">Column 3</p>
            <ul className="p-0 text-gray-400 text-sm">
                <li className="mt-2 inline-flex">
                    <a href="/">Link 1</a>
                </li>
                <li className="mt-2 inline-flex">
                    <a href="/">Link 2</a>
                </li>
            </ul>
        </div>
        <p className='text-white text-md my-4'>All rights reserved by @Harry Pathak 2024.</p>
    </div>
</footer>

  )
}

export default Footer