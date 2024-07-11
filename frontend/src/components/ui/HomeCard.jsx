import React, { useState } from 'react'
import ShareCard from './ShareCard'
import Button from "../ui/Button"
import UserCard from './UserCard'
import Slider from "react-slick";
import PostCard from './PostCard'

const HomeCard = ({
  fullname = "Suharshit Singh",
  username = "@suharshit",
  avatar = "https://i.pinimg.com/236x/29/39/03/293903177b045b60f77dd315021994af.jpg",
  title = "First Article",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, cum dolore sed deserunt dolor voluptatum laudantium temporibus qui cumque aliquam consequatur officiis ad voluptatem ullam.",
  image = "https://i.pinimg.com/236x/f2/bf/c9/f2bfc9ed4b6cfe3992d38a02e814dd31.jpg",
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  return (
    <>
      <div className='h-[480px] w-full bg-[#EDE4FF] rounded-lg flex gap-x-3 px-4 text-black items-center'>
        <div className='h-full w-[25%] flex flex-col justify-center'>
          <UserCard username={username} avatar={avatar} fullname={fullname}/>
        </div>
        <span className='h-[94%] w-[3px] bg-[#29282C]/35 rounded-full'></span>
        <div className='w-[70%] h-full flex flex-col justify-center px-2 mx-2'>
          <Slider {...settings}>
            <div>
              <PostCard/>
            </div>
            <div>
              <PostCard/>
            </div>
            <div>
              <PostCard/>
            </div>
            <div>
              <PostCard/>
            </div>
          </Slider>
        </div>
      </div>
    </>
  )
}

export default HomeCard