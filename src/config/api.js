import axios from 'axios'

export default axios.create({
  baseURL: 'https://college-api-conorm.herokuapp.com/api'
})
