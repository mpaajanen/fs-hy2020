const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog_helper = require('../utils/blog_helper')

const api = supertest(app)

describe('Tehtävä 4.8', () =>{
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one blog', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(1)
  })
})

describe('Tehtävä 4.10', () => {
  test('blog can be added', async () => {
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
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blog_helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blog_helper.initialBlogs.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})