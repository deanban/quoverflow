CREATE TABLE comment (
  id                           SERIAL PRIMARY KEY,
  body                         CHARACTER(64),
  FOREIGN KEY ("userId")       REFERENCES user(id),
  FOREIGN KEY ("questionId")   REFERENCES question(id),
  FOREIGN KEY ("answerId")     REFERENCES answer(id)
)
