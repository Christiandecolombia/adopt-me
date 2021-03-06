import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt-me"
})

class AdoptablePet {
  constructor({ id, name, imgUrl, img_url, age, vaccinationStatus, vaccination_status, adoptionStory, adoption_story, availableForAdoption, available_for_adoption, petTypeId, pet_type_id }) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl || img_url
    this.age = age
    this.vaccinationStatus = vaccinationStatus || vaccination_status || false
    this.adoptionStory = adoptionStory || adoption_story
    this.availableForAdoption = availableForAdoption || available_for_adoption || true
    this.petTypeId = petTypeId || pet_type_id
  }

  static async findAll() {
    try {
      const queryString = "SELECT * FROM adoptable_pets;"
      const result = await pool.query(queryString)
      const adoptablePetsData = result.rows
      const adoptablePets = adoptablePetsData.map(adoptablePet => new this(adoptablePet))
      return adoptablePets
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  async save() {
    try {
      const query = "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
      const result = await pool.query(query, [this.name, this.imgUrl, this.age, this.vaccinationStatus, this.adoptionStory, this.availableForAdoption, this.petTypeId])
      this.id = result.rows[0].id
      return true
    } catch (err) {
      throw (err)
    }
  }

  static async findById(id) {
    try {
      const queryString = `SELECT * FROM adoptable_pets WHERE id = $1;`
      const result = await pool.query(queryString, [id])
      const pet = new this(result.rows[0])
      return pet
    } catch (error) {
      throw(error)
    }
  }
}

export default AdoptablePet