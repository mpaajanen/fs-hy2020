const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const favouriteBlog = async () => {
  const blogs = await Blog.find({})

  const favBlog = blogs.reduce((fav, blog) => {
    return fav.likes > blog.likes ? fav : blog
  }, {})

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = async () => {
  const blogs = await Blog.find({})
  const authors = _.countBy(blogs, 'author')
  const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
  return {
    author: author,
    blogs: authors[author]
  }
}

const mostLikes = async () => {
  const blogs = await Blog.find({})
  const likesByAuthor =
  _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes') }))
    .value()
  const author = likesByAuthor.reduce((likes, author) => likes.likes > author.likes ? likes : author)
  return {
    author: author.author,
    likes: author.likes
  }
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, favouriteBlog, mostBlogs, mostLikes
}