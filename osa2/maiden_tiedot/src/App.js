import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ showAll ] = useState(false)
  const [ filter, setFilter ] = useState('')
  const [ apiRes, setApiRes ] = useState([])
  const [ capital, setCapital ] = useState('')

  const api_key = process.env.REACT_APP_API_KEY
  // const api_key = '25cc7f1716970a07f1a5d20f46331d93'

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(responce => {
        setCountries(responce.data)
      })
  }, [])

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: capital
    }
    if(capital !== '') {
      axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setApiRes(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
    else {
      setApiRes([])
    }
  }, [capital])


  useEffect(() => {
    if(countriesToShow.length===1) {
      setCapital(countriesToShow[0].capital)
    }
    else{
      setCapital('')
    }
  }, [filter])
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Maat</h1>  
      <div>Hae maata nimen perusteella:<br />
      <input id="filter" value={filter} onChange={handleFilter} /></div>
      <Countries key={countriesToShow.name} data={countriesToShow} setCapital={setCapital} fil={setFilter} apiRes={apiRes} />
      <Weather apiRes={apiRes} cts={countriesToShow} />
    </div>
  );
}

const Countries = ({ data, fil }) => {
  if(data.length > 10) {
    return(
      <div>Liian paljon tuloksia, tarkenna hakua.</div>
    )
  }
  if(data.length === 1) {
    return(
      <div>
        {data.map(country =>
          <div>
            {/* <Country key={country.name} name={country.name} /> */}
            <h2>{country.name}</h2>
            <div>
              Pääkaupunki: {country.capital}<br />
              Väkiluku: {country.population}
            </div>
            <h3>Viralliset kielet:</h3>
            <div>
              <ul>
                {country.languages.map(lang =>
                  <li>{lang.name}</li>
                )}
              </ul>
              <img src={country.flag} alt={country.name} width='100px'/>
            </div>
          </div>
        )}
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>Lista</h2>
        {data.map(country =>
          <div>
            <Country key={country.name} name={country.name} />
            <Button handleClick={() => {
              document.getElementById("filter").value = country.name
              fil(country.name)
              }
            }
            />
          </div>
        )}
      </div>
    )
  }
}

const Button = ({ handleClick }) => {
  return(
    <button onClick={handleClick} type="button">Näytä tiedot</button>
  )
}

const Country = ({ name }) => {
  return(
    <div>{name}</div>
  )
}

const Weather = ({ apiRes, cts }) => {
  if(apiRes.length === 0) return (
    <div></div>
  )
  else return (
    <div>
      <h3>Säätiedot - {apiRes.location.name}</h3>
      <div>Lämpötila: {apiRes.current.temperature}℃</div>
      <img src={apiRes.current.weather_icons[0]} alt='säätila' width='100px' />
    </div>
  )
}

export default App;
