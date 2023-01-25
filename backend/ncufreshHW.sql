PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE account(
    name TEXT PRIMARY KEY NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE article(
    id INTEGER PRIMARY KEY NOT NULL,
    words TEXT NOT NULL
);
CREATE TABLE comment(
    id INT PRIMARY KEY NOT NULL,
    words TEXT NOT NULL
);
COMMIT;
account  article  comment
1|Hello world!
2|Test two!