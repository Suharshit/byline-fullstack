import React from 'react'

const Card = () => {
  return (
    <>
        <div className='h-[380px] w-[650px] bg-[#EDE4FF] rounded-lg flex gap-y-3 pt-8 pl-4 text-black'>
            <img src="https://i.pinimg.com/736x/7e/ed/99/7eed9926be88cf56e377577574f48e5f.jpg" alt="" className='h-[320px] w-[320px] rounded-lg'/>
            <div className='px-4 '>
              <h1 className='text-2xl font-bold logo'> Article Title</h1>
              <p className='text-lg font-light'>
                <strong>description:</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, id accusamus vitae quidem voluptatem quae tenetur iste deserunt fugiat modi magnam exercitationem quas alias eaque. Pariatur iste eius voluptates blanditiis?
              </p>
            </div>
        </div>
    </>
  )
}

export default Card