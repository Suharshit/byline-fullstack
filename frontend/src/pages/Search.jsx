import React, { useEffect, useState } from 'react'
import Input from "../components/ui/Input"
import axios from "axios"
import HomePostCard from '../components/ui/HomePostCard'
import Button from '../components/ui/Button'
import AuthorCard from '../components/ui/AuthorCard'

const Search = () => {
  const [searchPosts, setSearchPosts] = useState([])
  const [searchAuthors, setSearchAuthors] = useState([])
  const [isPosts, setIsPosts] = useState(false)
  const [isAuthors, setIsAuthors] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsPosts(true)
    axios.get(`/v1/post/search-post?search=${search}`).then((res) => {
      setSearchPosts(res.data.message)
    })
  }, [setSearch, search, setIsPosts])

  const posts = async() => {
    setIsPosts(true)
    setIsAuthors(false)
    await axios.get(`/v1/post/search-post?search=${search}`).then((res) => {
      setSearchPosts(res.data.message)
    })
  }
  const authors = async() => {
    setIsAuthors(true)
    setIsPosts(false)
    await axios.get(`/v1/user/search-user?search=${search}`).then((res) => {
      setSearchAuthors(res.data.message)
      console.log(res.data.message);
    })
  }

  return (
    <>
      <div className='h-full w-full'>
        <div className='flex flex-col items-center'>
          <input 
            className={"bg-white text-black w-[40vw] h-12 rounded-xl px-2 font-semibold"}
            placeholder={"Search..."}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='flex w-full items-center justify-center space-x-5 text-lg font-semibold'>
          <Button children={"Posts"} onClick={() => posts()}/>
          <Button children={"Authors"} onClick={() => authors()}/>
        </div>
        {
          (searchPosts.length === 0 && isPosts)&& (
            <h1 className='text-center text-2xl'>No posts found</h1>
          )
        }
        {
          (searchAuthors.length === 0 && isAuthors)&& (
            <h1 className='text-center text-2xl'>No Author found</h1>
          )
        }

        { isPosts && (
            <div className='grid grid-cols-3 gap-y-12 pt-8'>
            {
              searchPosts.map((post) => {
                return (
                  <HomePostCard
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    description={post.description}
                    image={post.image}
                    author={post?.author.username}
                    authorId={post?.author._id}
                    avatar={post?.author.avatar}
                  />
                )
              })
            }
          </div>
        )  
      }

      {
        isAuthors && (
          <div className='grid grid-cols-1 space-y-4 px-[24vw] pt-8'>
            {
              searchAuthors.map((author) => {
                return (
                  <div key={author._id}>
                    <AuthorCard Author={author}/>
                  </div>
                )
              })
            }
          </div>
        )
      }
      </div>
    </>
  )
}

export default Search