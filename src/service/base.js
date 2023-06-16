import axios from 'axios'

const BASEURL = 'http://192.168.0.107:9001'
const OK_CODE = 0

axios.defaults.baseURL = BASEURL

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
  }
)

axios.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    console.log(error)
  }
)
export function get(url, params) {
  return axios
    .get(url, { params })
    .then(({ data }) => {
      if (data.code === OK_CODE) {
        return data
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
