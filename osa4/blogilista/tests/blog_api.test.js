const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const blog_helper = require('../utils/blog_helper')
// const test_helper = require('../utils/test_helper')

const api = supertest(app)

describe('Tehtävät 4.5 - 4.7', () => {
  test('4.5 - most liked blog', async () => {
    const mostLiked = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }
    const fav = await blog_helper.favouriteBlog()
    expect(fav).toEqual(mostLiked)
  })

  test('4.6 - most blogs by author', async () => {
    const mostBlogsByAuthor = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    }
    const result = await blog_helper.mostBlogs()
    expect(result).toEqual(mostBlogsByAuthor)
  })

  test('4.7 - most liked author', async () => {
    const mostLikedAuthor = {
      author: 'Michael Chan',
      likes: 7
    }
    const result = await blog_helper.mostLikes()
    expect(result).toEqual(mostLikedAuthor)
  })
})

describe('Tehtävä 4.8', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  //   test('there is one blog', async () => {
  //     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(1)
//   })
})

describe('Tehtävä 4.9', () => {
  test('id is defined', async () => {
    const blogs = await blog_helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
})

describe('Tehtävä 4.10', () => {
  test('blog can be added', async () => {
    const blogsAtStart = await blog_helper.blogsInDb()

    const newBlog = {
    //   _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blog_helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  })
})

describe('Teht 4.15 - when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testauksenalkeet', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await blog_helper.usersInDb()

    const newUser = {
      username: 'mikkopaa',
      name: 'Mikko Paajanen',
      password: 'salamana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await blog_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})