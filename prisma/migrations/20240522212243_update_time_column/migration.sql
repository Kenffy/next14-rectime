/*
  Warnings:

  - Added the required column `flexTime` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVacation` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overTime` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Time" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "pause" TEXT NOT NULL,
    "regular" TEXT NOT NULL,
    "overTime" TEXT NOT NULL,
    "flexTime" TEXT NOT NULL,
    "isVacation" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Time_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Time" ("createdAt", "date", "description", "endTime", "id", "pause", "startTime", "updatedAt", "userId") SELECT "createdAt", "date", "description", "endTime", "id", "pause", "startTime", "updatedAt", "userId" FROM "Time";
DROP TABLE "Time";
ALTER TABLE "new_Time" RENAME TO "Time";
PRAGMA foreign_key_check("Time");
PRAGMA foreign_keys=ON;
