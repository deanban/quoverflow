CREATE TABLE follow (
  "followingUserId" INTEGER REFERENCES user(id),
  "followedUserId" INTEGER REFERENCES user(id),
  PRIMARY KEY ("followingUserId", "followedUserId")
);
