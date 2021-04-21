import pg from "pg"

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/adopt-me"
})

class SurrenderApplicaion {
    constructor({ id, name, phoneNumber, phone_number, email, status, adoptablePetId, adoptable_pet_id }) {
        this.id = id
        this.name = name
        this.phoneNumber = phoneNumber || phone_number
        this.email = email
        this.adoptablePetId = adoptablePetId || adoptable_pet_id
        this.status = status || "pending"
    }
    async save() {
        try {
            const query = "INSERT INTO surrender_applications (name, phone_number, email, adoptable_pet_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING id;"
            const result = await pool.query(query, [this.name, this.phoneNumber, this.email, this.adoptablePetId, this.status])
            this.id = result.rows[0].id
            return true
        } catch (err) {
            throw (err)
        }
    }
}

export default SurrenderApplicaion