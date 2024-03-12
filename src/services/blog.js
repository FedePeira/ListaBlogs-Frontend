import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('Setting token...')
  console.log(newToken)
  token = `Bearer ${newToken}`
}

const getAll = () => {
  console.log('Getting all the blogs...')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  console.log('Creating blog...')
  const config = {
    headers: { Authorization: token },
  }

  console.log(config)
  console.log('Sending request...')
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('Updating blog...')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll, create, update, setToken
}