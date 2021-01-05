import React, { useState } from 'react'
const Blog = ({ blog, likeAdder, handleRemove, user }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    margin: 5
  }
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  const addLike = () => {
    console.log('liketys', blog.id, blog.likes)
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    console.log(likedBlog)
    likeAdder(likedBlog, blog.id)
  }

  const removeBlog = () => {
    handleRemove(blog.id)
  }

  // console.log(blog)
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url}<br />
        likes: {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user === undefined ? '' : blog.user.name}<br />
        {/* <button onClick={removeBlog}>remove</button> */}
        {blog.user.username === user.username ? <button onClick={removeBlog}>remove</button> : ''}
      </div>
    </div>
  )
}

export default Blog
