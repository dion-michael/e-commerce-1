import axios from 'axios'

// console.log(localStorage.getItem('token'));
export default axios.create({
    baseURL: 'http://localhost:3000'
})