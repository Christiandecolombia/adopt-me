import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/adopt-me"
})

class PetType {
  constructor({id, type, imgUrl, img_url, description}) {
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
      throw(error)
    }
}
}

export default PetType

