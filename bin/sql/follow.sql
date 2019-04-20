CREATE TABLE follow (
  "followingUserId" INTEGER REFERENCES account(id),
  "followedUserId" INTEGER REFERENCES account(id)
);
