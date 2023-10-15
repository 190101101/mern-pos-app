import React from 'react'

const AuthCarousel = ({image, title, text}) => {
  return (
    <div className='!flex flex-col items-center justify-center h-full mb-10'>
        <img src={image} className="w-[600px] h-[600px]"/>
        <h3 className="text-4xl text-white text-center font-bold">{title}</h3>
        <p className='mt-5 text-2xl text-white text-center'>{text}</p>
    </div>
  )
}

export default AuthCarousel