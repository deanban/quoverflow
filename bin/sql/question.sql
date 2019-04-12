CREATE TABLE question (
  id                              SERIAL PRIMARY KEY,
  body                            TEXT,
  "accountId"                     INTEGER,
  "categoryId"                    INTEGER,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
  FOREIGN KEY ("categoryId")      REFERENCES category(id)
);
