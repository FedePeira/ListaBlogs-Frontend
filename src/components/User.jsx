import { useParams } from "react-router-dom"

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if(!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name} tiene los siguiente Blogs:</h3>
      <ul>
        {user.blogs.map(blog => {
          return(
            <li key={blog.id}>
              <p>{blog.title}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default User