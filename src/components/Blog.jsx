import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import BlogItem from './BlogItem'
import Comment from './Comment'

const Blog = ({ blogs, addLikes, deleteBlog, addComment }) => {
  const [commentVisible, setCommentVisible] = useState(false)

  const [content, setContent] = useState('')

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const showWhenVisibleComment = { display: commentVisible ? '' : 'none' }

  const handleChangeLike = async (event) => {
    event.preventDefault()
    console.log('---------------')
    console.log('Adding Like...')
    const updatedBlog = await addLikes({
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
    console.log('Deleting...')
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user
    })
  }

  const handleSubmitComment = async (event) => {
    event.preventDefault()
    console.log('---------------')
    console.log('Adding comment...')
    const id = blog.id
    if (content) {
      addComment({ content, id });
      setContent('');
   }
    
  } 

  return (
    <div>
        <BlogItem
          blog={blog}
          handleChangeLike={handleChangeLike}
          handleChangeDelete={handleChangeDelete}
          handleChangeVisibilityComment={() => setCommentVisible(true)}
        />

      <div style={showWhenVisibleComment}>
        <CommentForm 
          content={content}
          handleSubmit={handleSubmitComment}
          handleContentChange={({ target }) => setContent(target.value)}/>
      </div>

      <h3>Comments</h3>
      <Comment
        blog={blog}
      />
    </div>
    
  )
}

export default Blog