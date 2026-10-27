
//------------ Sending Data (POST)--------

// import axios from 'axios'

// try {
//   const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
//     name: 'Asha',
//     email: 'asha@mail.com',
//   })

//   console.log(response.status)   // the status code
//   console.log(response.data)     // what the server sent back
// } catch (error) {
//   console.log('Failed:', error.message)
// }


//------------ Shared Axios Instance --------

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
})

try {
  const response = await api.get('/users/1')
  console.log(response.data.name)
} catch (error) {
  console.log('Failed:', error.message)
}
