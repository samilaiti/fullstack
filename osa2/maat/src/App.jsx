import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    weatherService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(response => {
        setWeather({temp: response.main.temp - 273.15, wind: response.wind.speed, icon: response.weather[0].icon })
      })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      capital: {country.capital}<br/>
      area: {country.area}<br/>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png} width="100" height="100" />
      <div>
        {weather.temp} Celsius<br/>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} /><br/>
        {weather.wind} m/s<br/>
      </div>
    </div>
  )
}

const Countries = ({ countries, showCountry, weather }) => {
  if (countries.length === 1) {    
    console.log(weather)
    return (
      <div>
        <Country country={countries[0]} weather={weather} />
      </div>
    )
  } else {
    return (
      <div>    
        {countries.map(country => 
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country.name.common)}>show</button>
          </p>
        )}
      </div>
    )
  }
}

function App() {
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [singleCountry, setSingleCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    // const lat = filtered[0].capitalInfo.latlng[0]
    // const lon = filtered[0].capitalInfo.latlng[1]
    // console.log(lat, lon)
    // weatherService
    //   .getWeather(lat, lon)
    //   .then(response => {
    //     const capitalWeather = { temp: response.main.temp - 273.15 , wind: response.wind.speed }
    //     setWeather(capitalWeather)
    //     console.log(capitalWeather)
    //   })

    if (filtered.length <= 10 && filtered.length >= 1) {
      console.log(filtered)
      console.log(weather)
      setFilteredCountries(filtered)
    }
    setFilterCountry(event.target.value)
  }

  const showCountry = name => {
    const filtered = countries.filter(country => country.name.common.toLowerCase() === name.toLowerCase())
    setFilteredCountries(filtered)
    setFilterCountry(name)
  }

  return (
    <div>
      <form>
      find countries: <input value={filterCountry} onChange={handleFilter} />
      </form>
      <Countries countries={filteredCountries} showCountry={showCountry} weather={weather} />
    </div>
  )
}

export default App
