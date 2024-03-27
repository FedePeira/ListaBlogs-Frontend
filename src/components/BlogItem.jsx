import { useState } from 'react'

const BlogItem = (props) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div>
      <div className="blog-item" style={hideWhenVisible}>
        <div className="blog-title">{props.blog.title}</div>
        <button onClick={() => setBlogVisible(true)}>More</button>
      </div>
      <div className="blog-item" style={showWhenVisible}>
        <div className="blog-title">{props.blog.title}</div>
        <div className="blog-author">{props.blog.author}</div>
        <div className="blog-url">
          <a href={props.blog.url} target="_blank" rel="noopener noreferrer">
            {props.blog.url}
          </a>
        </div>
        <div className="blog-likes">{props.blog.likes} Likes</div>
        <div className="blog-likes">
          {props.blog ? props.blog.comments.length + " Comments" : "Loading comments..."}
        </div>
        <button onClick={props.handleChangeLike}>Like</button>
        <button onClick={props.handleChangeDelete}>Delete</button>
        <button onClick={props.handleChangeVisibilityComment}>Comment</button>
        <button onClick={() => setBlogVisible(false)}>Hide</button>
      </div>
    </div>
  )
}

export default BlogItem