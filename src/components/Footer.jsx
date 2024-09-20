import React from 'react'

const Footer = () => {

  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center md:fixed bottom-0 w-full'>
        <div>
        <div className="logo font- text-2xl font-bold ">
            &lt;Pass
            <span className="text-green-500 ">OP/&gt;</span>
        </div>
        </div>
        <div className='flex justify-center items-center'>
            Created with <img className="w-8 mx-2" src="icons/heart.png" alt="" /> by Deepak Baghel
        </div>
    </div>
  )
}

export default Footer 

