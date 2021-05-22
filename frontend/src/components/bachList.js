import React, { useState, useEffect } from 'react'
import BachDataService from '../services/bachDataService'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function BachList(props) {
  const [baches, setBaches] = useState([])
  const [searchName, setSearchName ] = useState("")
  const [searchSuburb, setSearchSuburb ] = useState("")
  const [searchCity, setSearchCity ] = useState("")
  const [cities, setCities] = useState(["All Cities"])

  useEffect(() => {
    retrieveBaches()
    retrieveCities()
  }, [])

  function onChangeSearchName(e) {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  function onChangeSearchSuburb(e) {
    const searchSuburb= e.target.value
    setSearchSuburb(searchSuburb)
  }

  function onChangeSearchCity(e) {
    const searchCity= e.target.value
    setSearchCity(searchCity)
  }

  function retrieveBaches() {
    BachDataService.getAll()
      .then(res => {
        console.log(res.data)
        setBaches(res.data.baches)
      })
      .catch(e => {
        console.log(e)
      })
  }

  function retrieveCities(){
    BachDataService.getCities()
      .then(res => {
        console.log(res.data)
        setCities["All Cities"].concat(res.data) 
      })
      .catch(e => {
        console.log(e)
      })
  }

  function refreshList(){
    retrieveBaches()
  }

  function find(query, by) {
    BachDataService.findByQuery(query, by)
      .then(res => {
        console.log(res.data)
        setBaches(res.data.baches)
      })
      .catch(e => {
        console.log(e)
      })
  }

  function findByName() {
    find(searchName, "name")
  }

  function findBySuburb() {
    find(searchSuburb, "suburb")
  }

  function findByCity() {
    if (searchCity === "All Cities") {
      refreshList()
    } else {
      find(searchCity, "city")
    }
  }

  return (
    <div>
      <div className="row pb-1">
        {/* search by name */}
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        {/* search by suburb */}
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by suburb"
            value={searchSuburb}
            onChange={onChangeSearchSuburb}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findBySuburb}
            >
              Search
            </button>
          </div>
        </div>
        {/* search by city */}
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCity}>
             {cities.map(city => {
               return (
                 <option key={uuidv4()}value={city}> {city.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCity}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {baches.map((bach) => {
          const address = `${bach.address.suburb} ${bach.address.market}, ${bach.address.country}`
          return (
            <div key={uuidv4()} className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{bach.name}</h5>
                  <p className="card-text">
                    <strong>Description: </strong>{bach.description}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/bach/"+bach._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/place/" + bach.address.location} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}


      </div>
    </div>
  )
}

export default BachList