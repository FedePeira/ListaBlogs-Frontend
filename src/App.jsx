import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blog'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
      console.log('All blogs inserted')
      setSuccessMessage('All Blogs inserted')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
      console.log('All users inserted')
  }, [])

  useEffect(() => {
    const loggedUserJSON = null
    console.log('----------------')
    console.log('Token:', loggedUserJSON)
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('------------------')
      console.log('User token:', user.token)
      console.log('------------------')
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('--------------------')
    console.log('Blog: ', blogObject)
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        console.log('--------------------')
        console.log('Returned Blog: ', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage('Blog created')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const addLikes = (blogObject) => {
    blogService
      .updateBlog(blogObject.id, blogObject)
      .then(returnedBlog => {
        console.log('--------------------')
        console.log('Blog updated: ', returnedBlog)
        setSuccessMessage('Blog Updated')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const deleteBlog = (blogObject) => {
    blogService
      .deleteBlog(blogObject.id, blogObject)
      .then(returnedBlog => {
        console.log('--------------------')
        console.log('Blog deleted: ', returnedBlog)
        setSuccessMessage('Blog deleted')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  /*
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  */

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('---------------')
    console.log('logging in')

    try{
      const user = await loginService.login({
        username, password
      })
      alert('Log in successfull')
      setSuccessMessage('Log in successfull')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      console.log('----------------')
      console.log('Token: ', user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('---------------')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      {errorMessage && <ErrorNotification message={errorMessage}/>}
      {successMessage && <SuccessNotification message={successMessage}/>}

      {!user && loginForm()}
      {user && 
      <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
        <br/>
        <Blogs blogs={blogs} addLikes={addLikes} deleteBlog={deleteBlog}/>
        <h1>Users</h1>
        <Users users={users}/>
      </div>}
      <Footer/>
    </div>
  )
}

export default App
