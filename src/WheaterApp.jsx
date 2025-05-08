import { useState } from "react"
import './styles/WheaterApp.css'

export const WheaterApp = () => {
    const [ciudad, setCiudad] = useState('') 
    const [dataClima, setDataClima] = useState(null)
    const [error, setError] = useState(null)

    const API_KEY = import.meta.env.VITE_API_KEY
    const urlBase = import.meta.env.VITE_URL_BASE
    const difKelvin = 273.15

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
        setError(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.trim().length > 0) {
            fetchClima()
        }
    }

    const fetchClima = async() => {
        try {
            setError(null)
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener el clima')
            }
            
            setDataClima(data)
        } catch(e) {
            setError(e.message)
            console.error('Ocurrio el siguiente problema: ', e)
        }
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                    placeholder="Ingresa una ciudad..."
                    aria-label="Ciudad"
                />
                <button type="submit">Buscar</button>
            </form>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {dataClima && (
                <div className="weather-info">
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {Math.round(dataClima?.main?.temp - difKelvin)} °C</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                        alt={dataClima.weather[0].description}
                    />
                </div>
            )}
        </div>
    )
}