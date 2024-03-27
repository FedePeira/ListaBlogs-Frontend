import PropTypes from 'prop-types'

const CommentForm = (props) => {
  return (
    <div>
      <h2>Comment</h2>
        <form onSubmit={props.handleSubmit}>
          <div>
          content
            <input 
              id="content" 
              type="text"  
              value={props.content} 
              name="Content" 
              onChange={props.handleContentChange}
            />
          </div>
          <button id="comment-button" type="submit">comment</button>
        </form>
    </div>
  )
}

CommentForm.propTypes = {
 handleSubmit: PropTypes.func.isRequired,
 handleContentChange: PropTypes.func.isRequired,
};

export default CommentForm