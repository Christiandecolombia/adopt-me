import React, { useState } from "react"

import ErrorList from "./ErrorList"

const AdoptionForm = props => {
  const [errors, setErrors] = useState({})

  const [adoptionForm, setAdoptionForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: ""
  })

  const homeOptions = ["", "own", "rent managed"]
  const homes = homeOptions.map(option => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    )
  })

  const postApplication = async () => {
    try {
      const response = await fetch(`/api/v1/adoptable-pets/${props.id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(adoptionForm)
      })
      console.log(response)
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw (error)
      }
      const body = await response.json()
      console.log(body)
      setAdoptionForm(body.adoptionApplication)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const isValidSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    requiredFields.forEach(field => {
      if (adoptionForm[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleInput = event => {
    setAdoptionForm({
      ...adoptionForm,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const submitHandler = event => {
    event.preventDefault()
    if (isValidSubmission()) {
      postApplication()
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <ErrorList errors={errors} />
      <h3>Apply to adopt {props.name}!</h3>
      <label htmlFor="name">Name:
        <input 
          type="text"
          name="name"
          id="name"
          onChange={handleInput}
          value={adoptionForm.name}
        />
      </label>
      
      <label htmlFor="phoneNumber">Phone Number:
        <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        onChange={handleInput}
        value={adoptionForm.phoneNumber}
        />
      </label>

      <label htmlFor="email">Email:
        <input
        type="email"
        id="email"
        name="email"
        onChange={handleInput}
        value={adoptionForm.email}
        />
      </label>

      <label htmlFor="homeStatus">Home status:
        <select
        id="homeStatus"
        name="homeStatus"
        onChange={handleInput}
        value={adoptionForm.homeStatus}>
          {homes}
        </select>
      </label>

      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default AdoptionForm