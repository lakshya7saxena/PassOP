import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-slate-700 py-2.5 px-4 text-white'>
      <nav className='md:my-container flex justify-between items-center'>
        <div className='text-2xl font-bold'><span className='color'>&lt;</span>Pass<span className='color'>OP/&gt;</span></div>
        <button className='flex items-center  ring-1 ring-white rounded-full px-3 py-1.5 gap-3'>
          <img src="icons/github.svg" alt="" className='w-7 invert' />
          <a href='https://github.com/' target='_blank' className='font-bold'>GitHub</a>
        </button>
      </nav> 
    </header>
  )
}

export default Navbar