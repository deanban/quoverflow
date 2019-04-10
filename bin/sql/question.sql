CREATE TABLE question (
  id                          SERIAL PRIMARY KEY,
  body                        CHARACTER(64),
  FOREIGN KEY ("userId")      REFERENCES user(id),
  FOREIGN KEY ("categoryId")  REFERENCES category(id)
);
