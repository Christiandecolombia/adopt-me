import React, { useState } from "react"

const AdoptionForm = props => {
  const [adoptionForm, setAdoptionForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: ""
  })

  const homeOptions = ["", "own", "rent managed"]
  const homes = homeOptions.forEach(option => {
    <option key={option} value={option}>
      {option}
    </option>
  })

  return (
    <form>
      <label htmlFor="name">Name:
        <input 
          type="text"
          name="name"
          id="name"
          value=""
        />
      </label>
      
      <label htmlFor="phoneNumber">Phone Number:
        <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        onChange={handleInput}
        value=""
        />
      </label>

      <label htmlFor="email">Email:
        <input
        type="email"
        id="email"
        name="email"
        onChange={handleInput}
        value=""
        />
      </label>

      <label htmlFor="homeStatus">Home status:
        <select
        id="homeStatus"
        name="homeStatus"
        onChange={handleInput}
        value="">
          {homes}
        </select>
      </label>
    </form>
  )
}

export default AdoptionForm