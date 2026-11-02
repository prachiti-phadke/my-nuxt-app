// app/utils/api.js : the one place that knows the server address
import axios from 'axios'

export const api = axios.create({
  // Written once. api.get('/posts') becomes https://jsonplaceholder.typicode.com/posts
  baseURL: 'https://jsonplaceholder.typicode.com',
  // Give up and throw an error if the server takes longer than 5 seconds
  timeout: 5000,
})