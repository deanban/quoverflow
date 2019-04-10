CREATE TABLE question (
  id                              SERIAL PRIMARY KEY,
  body                            CHARACTER(64),
  "accountId"                     INTEGER,
  "categoryId"                    INTEGER,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
  FOREIGN KEY ("categoryId")      REFERENCES category(id)
);
