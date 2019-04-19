CREATE TABLE vote (
  "questionVoteCount"       INTEGER DEFAULT 0 NOT NULL,
  "answerVoteCount"         INTEGER DEFAULT 0 NOT NULL,
  "commentVoteCount"        INTEGER DEFAULT 0 NOT NULL,
  "accountId"               INTEGER REFERENCES account(id),
  "questionId"              INTEGER REFERENCES question(id),
  "answerId"                INTEGER REFERENCES answer(id),
  "commentId"               INTEGER REFERENCES comment(id)
);
