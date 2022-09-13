-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Hobbies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hobbies" ("active", "id", "img", "name", "userId") SELECT "active", "id", "img", "name", "userId" FROM "Hobbies";
DROP TABLE "Hobbies";
ALTER TABLE "new_Hobbies" RENAME TO "Hobbies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
