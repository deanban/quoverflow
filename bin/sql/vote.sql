CREATE TABLE vote (
  "accountId"               INTEGER REFERENCES account(id),
  "questionId"              INTEGER REFERENCES question(id),
  "answerId"                INTEGER REFERENCES answer(id),
  "commentId"               INTEGER REFERENCES comment(id),
  PRIMARY KEY ("accountId", "questionId", "answerId", "commentId")
);
