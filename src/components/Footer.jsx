import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-700 fixed bottom-0 md:static w-full  text-white flex flex-col items-center justify-center p-1'>
            <div className='flex items-center gap-1'>
                <div className='text-sm'>&copy; 2025 </div>
                <div className='text-sm font-bold'><span className='color'>&lt;</span>Pass<span className='color'>OP/&gt;</span></div>
            </div>
            <div className='text-sm'>All Rights Reserved</div>
        </div>
    )
}

export default Footer
