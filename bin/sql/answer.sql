CREATE TABLE answer (
  id                            SERIAL PRIMARY KEY,
  body                          TEXT,
  "questionId"                  INTEGER,
  "accountId"                   INTEGER,
  FOREIGN KEY ("questionId")    REFERENCES question(id),
  FOREIGN KEY ("accountId")     REFERENCES account(id)
);
