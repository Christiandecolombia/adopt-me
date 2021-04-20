import pg from "pg"
// import path from "path"
// import LineReader from "line-reader"
// import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt-me" })

class Seeder {
  static async seed() {
    try {
      const pet_types = [
        {
          type: "cat",
          img_url: "https://images.unsplash.com/photo-1610301097329-50f1eca871dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          description: "4 legged small animal with attitude"
        },
        {
          type: "dog",
          img_url: "https://images.unsplash.com/photo-1534432586043-ead5b99229fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          description: "Human's best friend"
        },
        {
          type: "parrot",
          img_url: "https://images.unsplash.com/photo-1517101724602-c257fe568157?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBhcnJvdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Feathered friends who can learn bad words"
        }
      ]
      for (let i = 0; i < pet_types.length; i++) {
        const pet_type = pet_types[i]
        const queryString = "INSERT INTO pet_types (type, img_url, description) VALUES ($1,$2,$3);"
        await pool.query(queryString, [pet_type.type, pet_type.img_url, pet_type.description])
      }
      pool.end()
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }
}

export default Seeder
