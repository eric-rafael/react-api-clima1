import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  //função que chama a api
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHATER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    // console.log(res.data);
  }

  useEffect(() =>
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  )
  if (location === false) {
    return (
      <Fragment>
        <h1>Você precisa aceitar localização no browser o/</h1>
      </Fragment>
    )
  } else if (weather === false){
    return (
      <Fragment>
        Carregando clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas coordenadas ({ weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Cidade: {weather['name']}</li>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura mínima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
