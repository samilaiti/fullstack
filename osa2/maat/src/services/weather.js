import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?' //lat=44.34&lon=10.99&appid=api_key'

const getWeather = (lat, lon) => {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
  return request.then(response => response.data)
}
  
export default { getWeather }