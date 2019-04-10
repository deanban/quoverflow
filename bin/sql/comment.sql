CREATE TABLE comment (
  id                           SERIAL PRIMARY KEY,
  body                         CHARACTER(64),
  "accountId"                  INTEGER,
  "questionId"                 INTEGER,
  "answerId"                   INTEGER,
  FOREIGN KEY ("accountId")    REFERENCES account(id),
  FOREIGN KEY ("questionId")   REFERENCES question(id),
  FOREIGN KEY ("answerId")     REFERENCES answer(id)
)
