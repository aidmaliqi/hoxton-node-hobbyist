-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Hobbies" ("active", "id", "img", "name") SELECT "active", "id", "img", "name" FROM "Hobbies";
DROP TABLE "Hobbies";
ALTER TABLE "new_Hobbies" RENAME TO "Hobbies";
CREATE UNIQUE INDEX "Hobbies_name_key" ON "Hobbies"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
