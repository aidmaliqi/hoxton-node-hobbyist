/*
  Warnings:

  - You are about to drop the column `userId` on the `Hobbies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_HobbiesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_HobbiesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Hobbies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HobbiesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Hobbies" ("active", "id", "img", "name") SELECT "active", "id", "img", "name" FROM "Hobbies";
DROP TABLE "Hobbies";
ALTER TABLE "new_Hobbies" RENAME TO "Hobbies";
CREATE UNIQUE INDEX "Hobbies_name_key" ON "Hobbies"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_HobbiesToUser_AB_unique" ON "_HobbiesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HobbiesToUser_B_index" ON "_HobbiesToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
