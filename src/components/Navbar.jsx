import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font- text-2xl font-bold ">
            &lt;Pass
            <span className="text-green-500 ">OP/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="">Home</a>
                <a className='hover:font-bold' href="">About</a>
                <a className='hover:font-bold' href="">contact</a>
                
            </li>
        </ul> */}
        <button className='text-white bg-green-700 my-5 rounded-full ring-white ring-1 flex  justify-between items-center '>
          <img className='invert w-10 p-1' src="icons/github.svg" alt="" />
          <span className="font-bold px-2">
          GitHub
          </span>
        </button>
        </div>
      
    </nav>
  )
}

export default Navbar
