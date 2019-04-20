CREATE TABLE account (
  id            SERIAL PRIMARY KEY,
  "firstName"   TEXT,
  "lastName"    TEXT,
  email         TEXT,
  password      CHARACTER(72)
);
