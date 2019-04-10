CREATE TABLE userCategory (
  "userId" INTEGER REFERENCES user(id),
  "categoryId" INTEGER REFERENCES category(id),
  PRIMARY KEY ("userId", "categoryId")
);
