import { useParams } from "react-router-dom"

const Comment = ({ blog }) => {
  return (
    <div>
      <ul>
        {blog.comments.map(comment => {
          return(
            <li key={comment.id}>
              <p>{comment.content}</p>
            </li>
          )
        }) }
      </ul>
    </div>
  )
}

export default Comment