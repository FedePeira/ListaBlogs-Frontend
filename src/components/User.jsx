import { useParams } from "react-router-dom"

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  console.log(id)
  console.log(user)

  if(!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
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