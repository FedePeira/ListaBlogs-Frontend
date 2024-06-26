import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `${apiUrl}/api/blogs`

let token = null

const setToken = newToken => {
  console.log('---------------')
  console.log('Setting token...')
  console.log('---------------')
  console.log(newToken)
  token = `Bearer ${newToken}`
}

const getAll = () => {
  console.log('Getting all the blogs...')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = newObject => {
  console.log('Creating blog...')
  console.log('Blog: ', newObject)
  console.log('-------------------')
  const config = {
    headers: { Authorization: token },
  }
  console.log('Config: ', config)
  console.log('-------------------')

  console.log('Sending request...')
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const updateBlog = (id, newObject) => {
  console.log('------------------')
  console.log('Updating blog...')
  console.log('Id: ', id)
  console.log('New Object: ', newObject)
  console.log('-------------------')

  console.log('Sending request...')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (id, newObject) => {
  console.log('------------------')
  console.log('Deleting blog...')
  console.log('Id: ', id)
  console.log('New Object: ', newObject)
  console.log('------------------')

  const config = {
    headers: { Authorization: token },
  }
  console.log('Config: ', config)
  console.log('-------------------')
  
  console.log('Sending request...')

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const createComment = (commentObject) => {
  console.log('---------------------');
  console.log('Creating Comment...');
  console.log('Comment: ', commentObject);

  const url = `${baseUrl}/${commentObject.id}/comments`;

  console.log('Url: ', url)
  const config = {
      headers: { Authorization: token },
  };

  const request = axios.post(url, commentObject, config);
  console.log(request)
  return request.then(response => response.data)
}

export default {
  getAll, createBlog, updateBlog, setToken, deleteBlog, createComment
}