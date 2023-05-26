import React, { useState } from "react"

const MapSearch = (props) => {
  const [searchInput, setSearchInput] = useState("")
  
  const handleChange = (event) => {
    event.preventDefault()
    setSearchInput(event.currentTarget.value)
  }

  const handleSearch = () => {
    event.preventDefault()
    props.setSearchQuery(searchInput)
  }

  return (
    <div className="location-search-bar">
        <h3>Add Location</h3>
        <label htmlFor="search">
            <input
            id="search"
            type="text"
            onChange={handleChange}
            />
        </label>

      <button className="button" onClick={handleSearch}>Search</button>
    </div>
  )
}

export default MapSearch