CREATE TABLE user(
  id            SERIAL PRIMARY KEY,
  "firstName"   CHARACTER(64),
  "lastName"    CHARACTER(64),
  email         CHARACTER(64),
  password      CHARACTER(72)
)
