import axios from 'axios';


export const baseUrl = 'https://api.buzzhubapp.com/';
// export const baseUrl = "http://192.168.8.104:5000";

const instance = axios.create({
  baseURL: baseUrl, 
});

instance.interceptors.request.use((request) => {

  let token = localStorage.getItem('token')
  request.headers = {
    'Accept': "application/json, text/plain, */*",
    'Authorization': `Bearer ${token}`,
  }
  return request
});

instance.interceptors.response.use((response) => {
  if (response) {
    return response
  }
}, function (error) {
  
  if (error.response.status === 401) {
    localStorage.clear()
    // window.location.href = "/login";
  }
  return Promise.reject(error);
});

export default instance;