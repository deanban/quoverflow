CREATE TABLE userCategory (
  "accountId" INTEGER REFERENCES account(id),
  "categoryId" INTEGER REFERENCES category(id),
  PRIMARY KEY ("accountId", "categoryId")
);
