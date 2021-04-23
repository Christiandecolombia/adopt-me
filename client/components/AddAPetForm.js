import React, { useState, useEffect } from "react"
import _ from "lodash"

import ErrorList from "./ErrorList"

const AddAPetForm = props => {
  const [petTypes, setPetTypes] = useState([])

  const [message, setMessage] = useState("")

  const [errors, setErrors] = useState({})

  const [newPet, setNewPet] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "",
    petImage: "",
    vaccinationStatus: ""
  })

  const getPetTypes = async () => {
    try {
      const response = await fetch("/api/v1/pet-types")
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw (error)
      }
      const body = await response.json()
      setPetTypes(body.petTypes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInput = event => {
    setNewPet({
      ...newPet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const isValidSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "petName", "petAge", "petType", "petImage", "vaccinationStatus"]
    requiredFields.forEach(field => {
      if (newPet[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const petOptions = petTypes.map(petType => {
    return (
      <option key={petType.id} value={petType.type}>
        {petType.type}
      </option>
    )
  })

  const postNewPet = async () => {
    try {
      const response = await fetch("/api/v1/adoptable-pets", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newPet)
      })
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw (error)
      }
      const body = await response.json()
      setMessage("Your surrender request is in process.")
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const clearForm = event => {
    setNewPet({
      name: "",
      phoneNumber: "",
      email: "",
      petName: "",
      petAge: "",
      petType: "",
      petImage: "",
      vaccinationStatus: ""
    })
    setErrors({})
  }

  const submitHandler = event => {
    event.preventDefault()
    if (isValidSubmission()) {
      postNewPet()
      clearForm()
    }
  }

  useEffect(() => {
    getPetTypes()
  }, [])

  return (
    <form className="callout surrender-form" onSubmit={submitHandler}>
      <ErrorList errors={errors} />

      <h2 className="text-center">Surrender a pet</h2>
      <p>{message}</p>
      <label htmlFor="name">Name:
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInput}
          value={newPet.name}
        />
      </label>

      <label htmlFor="phoneNumber">Phone Number:
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          onChange={handleInput}
          value={newPet.phoneNumber}
        />
      </label>

      <label htmlFor="email">Email:
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInput}
          value={newPet.email}
        />
      </label>

      <label htmlFor="petName">Pet Name:
        <input
          type="text"
          id="petName"
          name="petName"
          onChange={handleInput}
          value={newPet.petName}
        />
      </label>

      <label htmlFor="petAge">Pet Age:
        <input
          type="number"
          id="petAge"
          name="petAge"
          onChange={handleInput}
          value={newPet.petAge}
        />
      </label>

      <label htmlFor="petType">Select a pet type:
        <select
          id="petType"
          name="petType"
          onChange={handleInput}
          value={newPet.petType}>
          <option></option>
          {petOptions}
        </select>
      </label>

      <label htmlFor="petImage">Pet Image:
        <input
          type="text"
          id="petImage"
          name="petImage"
          onChange={handleInput}
          value={newPet.petImage}
        />
      </label>

      <label htmlFor="vaccinationStatus">Vaccination Status:
        <input
          type="text"
          id="vaccinationStatus"
          name="vaccinationStatus"
          onChange={handleInput}
          value={newPet.vaccinationStatus}
        />
      </label>
      <div className="text-center">
        <button type="button" className="button" onClick={clearForm}>
          Clear
        </button>
      </div>
      <div className="text-center"><input className="button" type="submit" value="Submit" /></div>
    </form>
  )
}


export default AddAPetForm