CREATE TABLE answer (
  id                            SERIAL PRIMARY KEY,
  body                          CHARACTER(64),
  FOREIGN KEY ("questionId")    REFERENCES question(id),
  FOREIGN KEY ("userId")        REFERENCES user(id)
);
