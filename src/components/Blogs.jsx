import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import {
  Link
} from "react-router-dom"
import PropTypes from 'prop-types'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, addBlog }) => {

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                                
                </TableCell>
                <TableCell>
                  Blog Author
                </TableCell>
              </TableRow>

              {blogs.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>          
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

Blogs.propTypes = {
 blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.object.isRequired, 
    })
 )
};

export default Blogs