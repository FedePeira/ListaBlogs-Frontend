import PropTypes from 'prop-types'

const Note = ({ blog, toggleImportance }) => {
  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  toggleImportance: PropTypes.func.isRequired,
}

export default Note