import { useState } from 'react'

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
  const handleChangeLike = async (event) => {
    event.preventDefault()
    console.log('---------------')
    console.log('Adding Like...')
    addLikes({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const handleChangeDelete = async (event) => {
    event.preventDefault()
    console.log('---------------')
    console.log('Adding Like...')
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user
    })
  }

  return (
    <div>
      <div className="blog-item" style={hideWhenVisible}>
        <div className="blog-title">{blog.title}</div>
        <button onClick={() => setLoginVisible(true)}>More</button>
      </div>
      <div className="blog-item" style={showWhenVisible}>
        <div className="blog-title">{blog.title}</div>
        <div className="blog-author">{blog.author}</div>
        <div className="blog-url">
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        <div className="blog-likes">{blog.likes} likes</div>
        <button onClick={handleChangeLike}>Like</button>
        <button onClick={handleChangeDelete}>Delete</button>
        <button onClick={() => setLoginVisible(false)}>Hide</button>
      </div>
    </div>
    
  )
}

export default Blog