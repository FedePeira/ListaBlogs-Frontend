import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, addLikes, deleteBlog }) => {
  console.log(blogs)

  return (
    <div>
      <ul>
        {blogs && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            deleteBlog={deleteBlog}
          />
        )}
      </ul>
    </div>
  )
}

Blogs.propTypes = {
 blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      ulr: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired, 
    })
 ),
 addLikes: PropTypes.func.isRequired,
 deleteBlog: PropTypes.func.isRequired,
};

export default Blogs