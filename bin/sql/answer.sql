CREATE TABLE answer (
  id                            SERIAL PRIMARY KEY,
  body                          CHARACTER(64),
  "questionId"                  INTEGER,
  "accountId"                   INTEGER,
  FOREIGN KEY ("questionId")    REFERENCES question(id),
  FOREIGN KEY ("accountId")     REFERENCES account(id)
);
