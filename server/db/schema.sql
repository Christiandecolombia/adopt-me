DROP TABLE IF EXISTS surrender_applications; 
DROP TABLE IF EXISTS adoptable_pets;
DROP TABLE IF EXISTS pet_types CASCADE;

CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  img_url TEXT NOT NULL,
  description TEXT
);

CREATE TABLE adoptable_pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  img_url TEXT NOT NULL,
  age INTEGER,
  vaccination_status BOOLEAN DEFAULT false,
  adoption_story TEXT NOT NULL,
  available_for_adoption BOOLEAN DEFAULT true,
  pet_type_id INTEGER REFERENCES pet_types(id)
);

CREATE TABLE surrender_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(12),
  email VARCHAR(255),
  status VARCHAR(255) DEFAULT 'pending',
  adoptable_pet_id INTEGER REFERENCES adoptable_pets(id)
);


