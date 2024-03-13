import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title,setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          value={title}
          onChange={handleChangeTitle}
          placeholder="title..."
        />
        <input
          value={author}
          onChange={handleChangeAuthor}
          placeholder="author..."
        />
        <input
          value={url}
          onChange={handleChangeUrl}
          placeholder="url..."
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm