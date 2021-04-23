import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt-me" })

class Seeder {
  static async seed() {
    try {
      const petTypes = [
        {
          type: "cat",
          imgUrl: "https://images.unsplash.com/photo-1610301097329-50f1eca871dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          description: "4 legged small animal with attitude"
        },
        {
          type: "dog",
          imgUrl: "https://images.unsplash.com/photo-1534432586043-ead5b99229fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          description: "Human's best friend"
        },
        {
          type: "parrot",
          imgUrl: "https://images.unsplash.com/photo-1517101724602-c257fe568157?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBhcnJvdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Feathered friends who can learn bad words"
        },
        {
          type: "hamster",
          imgUrl: "https://www.thesprucepets.com/thmb/4OAoAx-ApcojoHpkgxIlbPf0cpw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/you-have-called-me-dwarf-hamster-6-weeks-old-184337772-5848b1065f9b58dccc9fc10c.jpg",
          description: "Adorable creatures that fit in the palm of your hands"
        }
      ]
      for (let i = 0; i < petTypes.length; i++) {
        const petType = petTypes[i]
        const queryString = "INSERT INTO pet_types (type, img_url, description) VALUES ($1,$2,$3);"
        await pool.query(queryString, [petType.type, petType.imgUrl, petType.description])
      }

      const catData = await pool.query("SELECT * FROM pet_types WHERE type = 'cat';")
      const cat = catData.rows[0]
      const dogData = await pool.query("SELECT * FROM pet_types WHERE type = 'dog';")
      const dog = dogData.rows[0]
      const parrotData = await pool.query("SELECT * FROM pet_types WHERE type = 'parrot';")
      const parrot = parrotData.rows[0]

      const adoptablePets = [
        {
          name: "Chairman",
          imgUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          age: 10,
          vaccinationStatus: true,
          adoptionStory: "I had a litter of kittens and now it's my time to find a forever home. I had an injury to my eye that has left a cloudiness but doesn't affect how pretty I am. My foster mom says that I am one of the most loving cats you'll ever meet!",
          availableForAdoption: true,
          petType: cat
        },
        {
          name: "Finnegan",
          imgUrl: "https://pet-uploads.adoptapet.com/4/3/7/534826769.jpg",
          age: 1,
          vaccinationStatus: true,
          adoptionStory: "Finn is a 11 month old gorgeous golden retriever. He is looking for an active family who will help him release all that young puppy energy. Potentially another dog would be very helpful for him to learn from. He is already great waiting for his food, the come command, sit.",
          availableForAdoption: true,
          petType: dog
        },
        {
          name: "Nuda",
          imgUrl: "https://images.squarespace-cdn.com/content/v1/5605d3b7e4b02efb2673025b/1609099994078-XWOB7NVRQKA5CZ3U1UXL/ke17ZwdGBToddI8pDm48kJkrE6X8moM_PTx9qpA_JSV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ubri6f0vCAIB69QDJwJFpBRoN5A3B6vZBiLBtkdMjFH2KVa4HsEE8oiifVEfmNSkJw/IMG_3136.jpg?format=750w",
          age: 2,
          vaccinationStatus: true,
          adoptionStory: "Nuda has always lived in homes with other birds, and although she tends to bond more closely with people she does enjoy the companionship of other birds in the home. Nuda is selective with the people she likes and she takes time to warm up to strangers.",
          availableForAdoption: true,
          petType: parrot
        }
      ]

      for(let i = 0; i < adoptablePets.length; i++) {
        const adoptablePet = adoptablePets[i]
        const queryString = `INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7);`
        await pool.query(queryString, [adoptablePet.name, adoptablePet.imgUrl, adoptablePet.age, adoptablePet.vaccinationStatus, adoptablePet.adoptionStory, adoptablePet.availableForAdoption, adoptablePet.petType.id])
      }

      pool.end()
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }
}

export default Seeder
