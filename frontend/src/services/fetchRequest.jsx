import { REQUEST_URL } from './config'

function fetchFunc (url, method, data = null) {
  const URL = REQUEST_URL + url
  const option = {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
    },
    body: data ? JSON.stringify(data) : undefined
  }
  return fetch(URL, option)
}
window.fetchFunc = fetchFunc
export default fetchFunc
