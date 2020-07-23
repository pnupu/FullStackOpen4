const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

jest.setTimeout(60000)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialblogs[0])
  await blogObject.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialblogs.length)
})

test('blogs have id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('Post Test', async () => {
  const blogToBeAdded = [
    {
      title: "Uusi Blogi",
      author: "naata",
      url: "urli",
      likes: 7, 
      __v: 0
    }
  ]
  let newBlog = new Blog(blogToBeAdded[0])
  await api
   .post('/api/blogs')
   .send(newBlog)
   .expect(200)             
   .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialblogs.length + 1)
  const title = blogsAtEnd.map(title => title.title)
  expect(title).toContain('Uusi Blogi')


})

test('Likes are zero', async () => {
  const blogToBeAdded = [
    {
      title: "Uusi Blogi",
      author: "naata",
      url: "urli", 
      __v: 0
    }
  ]
  let newBlog = new Blog(blogToBeAdded[0])
  await api
   .post('/api/blogs')
   .send(newBlog)
   .expect(200)             
   .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(like => like.likes)
  expect(likes).toContain(0)

})

test('bad blog post test', async () => {
  const blogToBeAdded = [
    {
      author: "naata",
      likes: 3,
      url: "urli", 
      __v: 0
    }
  ]
  await api
   .post('/api/blogs')
   .send(blogToBeAdded)
   .expect(400)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialblogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})