import PropTypes from 'prop-types'

const ErrorNotification = ({ message }) => {
  if(message === null) {
    return null
  } else {
    return(
      <div className='error'>
        {message}
      </div>
    )
  }
}

ErrorNotification.propTypes = {
  message: PropTypes.string,
}

export default ErrorNotification