import React from 'react'
import { LuLinkedin, LuGithub } from "react-icons/lu"

const Footer = () => {
  return (
    <footer className='w-full flex flex-col items-center justify-center absolute bottom-5'>
      
      <div className='flex gap-4 mb-1 text-xl font-extralight'>
        <a href="https://linkedin.com/in/asadullah-butt" target="_blank" rel="noopener noreferrer"><LuLinkedin /></a>
        <a href="https://github.com/Asadullah-byte" target="_blank" rel="noopener noreferrer"><LuGithub /></a>
      </div>

      
      <p>
        &copy; 2025 Updated by <a href='https://github.com/Asadullah-byte' className='font-extralight underline'>Asadullah</a>
      </p>
    </footer>
  )
}

export default Footer
