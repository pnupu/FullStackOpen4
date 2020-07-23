const Blog = require('../models/blog')

const initialblogs = [
    {
      title: "Blogi",
      author: "kirjoittaja",
      url: "url",
      likes: 3, 
      __v: 0
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    blogs.map(blog => blog.toJSON())
    return blogs
}

module.exports = {
    initialblogs, blogsInDb
}