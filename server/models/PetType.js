import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt-me"
})

class PetType {
  constructor({ id, type, imgUrl, img_url, description }) {
    this.id = id
    this.type = type
    this.imgUrl = imgUrl || img_url
    this.description = description
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM pet_types;")
      const petTypesData = result.rows
      const petTypes = petTypesData.map(petType => {
        return new this(petType)
      })
      return petTypes
    } catch (error) {
      throw (error)
    }
  }

  static async findByType(type) {
    try {
      const queryString = "SELECT * FROM  pet_types WHERE type = $1;"
      const result = await pool.query(queryString, [type])
      const petTypeData = result.rows[0];
      const petType = new this(petTypeData)
      return petType
    } catch (error) {
      throw (error)
    }
  }

  async adoptablePets() {
    const petFile = await import("./AdoptablePet.js")
    const AdoptablePet = petFile.default
    try {
      const query = `SELECT * FROM adoptable_pets WHERE pet_type_id = $1;`
      const result = await pool.query(query, [this.id])
      const relatedPetData = result.rows
      const relatedPets = relatedPetData.map(pet => new AdoptablePet(pet))
      return relatedPets
    } catch (err) {
      console.log(err)
      throw (err)
    }
  }

  async getAvailablePets() {
    const petFile = await import("./AdoptablePet.js")
    const AdoptablePet = petFile.default
    try {
      const query = `SELECT *
      FROM adoptable_pets 
      LEFT JOIN surrender_applications 
      ON adoptable_pet_id = adoptable_pets.id 
      AND surrender_applications.status = 'accepted'
      WHERE pet_type_id = $1;`
      const result = await pool.query(query, [this.id])
      const relatedPetData = result.rows
      const relatedPets = relatedPetData.map(pet => new AdoptablePet(pet))
      return relatedPets
    } catch (err) {
      console.log(err)
      throw (err)
    }
  }
}

export default PetType

