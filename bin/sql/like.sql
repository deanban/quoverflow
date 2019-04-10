CREATE TABLE like (
  id                            SERIAL PRIMARY KEY,
  FOREIGN KEY ("userId")        REFERENCES user(id),
  FOREIGN KEY ("questionId")    REFERENCES question(id),
  FOREIGN KEY ("answerId")      REFERENCES answer(id),
  FOREIGN KEY ("commentId")     REFERENCES comment(id)

);
