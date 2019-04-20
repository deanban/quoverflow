#!/bin/bash
echo "Dropping QUOVERFLOW"
dropdb -U node_user quoverflow
echo "Creating QUOVERFLOW"
createdb -U node_user quoverflow

echo "Assigning People: Running account.sql"
psql -U node_user quoverflow < ./bin/sql/account.sql
echo "Creating Categories: Running category.sql"
psql -U node_user quoverflow < ./bin/sql/category.sql
echo "Assigning People to Categories: Running userCategory.sql"
psql -U node_user quoverflow < ./bin/sql/userCategory.sql
echo "Following People: Running follow.sql"
psql -U node_user quoverflow < ./bin/sql/follow.sql
echo "Creating Questions: Running question.sql"
psql -U node_user quoverflow < ./bin/sql/question.sql
echo "Creating Search Trigger and Tokenizing: Running tokenizeQBody.sql"
psql -U node_user quoverflow < ./bin/sql/tokenizeQBody.sql
echo "Answering questions: Running answer.sql"
psql -U node_user quoverflow < ./bin/sql/answer.sql
echo "Commenting: Running comment.sql"
psql -U node_user quoverflow < ./bin/sql/comment.sql
echo "Upvoting things: Running vote.sql"
psql -U node_user quoverflow < ./bin/sql/vote.sql
echo "Seeding QUOVERFLOW With Some Data"
node ./bin/seed.js
node ./bin/seed2.js
node ./bin/seed3.js
node ./bin/seed4.js

echo "QUOVERFLOW Database Created. Good Luck!"




