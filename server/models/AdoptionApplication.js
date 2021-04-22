import pg from "pg"

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/adopt-me"
})

class AdoptionApplication {
    constructor({ id, name, phone_number, email, home_status, applicaion_status, adoptable_pet_id }) {
        this.id = id
        this.name = name
        this.phoneNumber = phone_number || phoneNumber
        this.email = email
        this.homeStatus = home_status || homeStatus
        this.applicationStatus = applicaion_status || applicationStatus || "pending"
        this.adoptablePetId = adoptable_pet_id || adoptablePetId
    }

    async save() {
        try {
            const query = "INSERT INTO adoption_applications (name, phone_number, email, home_status, applicaion_status, adoptable_pet_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
            const result = await pool.query(query, [this.name, this.phoneNumber, this.email, this.homeStatus, this.applicationStatus, this.adoptablePetId])
            this.id = result.rows[0].id
            return true
        } catch (err) {
            throw (err)
        }
    }
}
export default AdoptionApplication