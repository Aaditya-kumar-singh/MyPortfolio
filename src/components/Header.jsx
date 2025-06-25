import React from 'react'

export default function Header() {
  return (
    <div className='border w-full fixed mt-10 mr-20  flex justify-end z-10 items-center'>
       <button className='px-6 py-3 hover:bg-gray-500 text-xl rounded-full border-2 bg-black'>About Us</button>
       <button className='bg-red px-4 py-2'>Skills</button>
       <button className='bg-red px-4 py-2'>Projects</button>
       <button className='bg-red px-4 py-2'>Get-In-Touch</button>
    </div>
  )
}
