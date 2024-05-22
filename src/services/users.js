import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL
const baseUrl = `${apiUrl}/api/users`

const getAll = () => {
  console.log('Getting all the users...')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {
  getAll
}