// Hooks
import { useState, useEffect, useRef } from 'react'

// Notification
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

// Components
import Footer from './components/Footer'

// Forms
import LoginForm from './components/LoginForm'

// Blog y User
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

// Service
import blogService from './services/blog'
import loginService from './services/login'
import userService from './services/users'

// React Router
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
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
  }, [])

  useEffect(() => {
    const loggedUserJSON = null

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      commentService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
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

  const addComment = (commentObject) => {
    console.log('--------------------')
    console.log('Comment: ', commentObject)
    
    blogService
      .createComment(commentObject)
      .then(() => {
        console.log('--------------------')
        console.log('Comment added to blog')
        setSuccessMessage('Comment added')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const addLikes = (blogObject) => {
    return blogService
      .updateBlog(blogObject.id, blogObject)
      .then(returnedBlog => {
        console.log('--------------------')
        console.log('Blog updated: ', returnedBlog)
        setSuccessMessage('Blog Updated')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        return returnedBlog
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

  const handleLogout = () => {
    console.log('---------------')
    console.log('logging out')

    setUser(null)
    setUsername('')
    setPassword('')

    window.localStorage.removeItem('loggedNoteappUser')

    blogService.setToken(null)

    alert('Log out successfull')
    setSuccessMessage('Log out successful')
    setTimeout(() => {
        setSuccessMessage(null)
    }, 3000);
  }
  
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <h1>Login</h1>
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

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
          {errorMessage && <ErrorNotification message={errorMessage}/>}
          {successMessage && <SuccessNotification message={successMessage}/>}

          {!user && loginForm()}

          {user && 
            <div>
              <div>
                <Link style={padding} to="/blogs">Blogs</Link>
                <Link style={padding} to="/users">Users</Link>
                {user ? 
                  <div>
                    <em>{user.name} logged in</em> <button onClick={handleLogout}>log out</button>
                  </div>
                  : <Link style={padding} to="/login">login</Link>
                }
              </div>

              <Routes>
                <Route path="/blogs" element={<Blogs blogs={blogs} addBlog={addBlog}/>} />
                <Route path="/users" element={<Users users={users} />} />

                <Route path="/blogs/:id" element={<Blog blogs={blogs} addLikes={addLikes} deleteBlog={deleteBlog} addComment={addComment}/>}/>
                <Route path="/users/:id" element={<User users={users}/>} />
              </Routes>
            </div>
          }
      </Router>

      <Footer/>
    </div>
  )
}

export default App
