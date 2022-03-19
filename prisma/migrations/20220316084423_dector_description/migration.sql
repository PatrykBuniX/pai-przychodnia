-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "avatar" TEXT NOT NULL
);
INSERT INTO "new_Doctor" ("avatar", "endTime", "id", "name", "startTime") SELECT "avatar", "endTime", "id", "name", "startTime" FROM "Doctor";
DROP TABLE "Doctor";
ALTER TABLE "new_Doctor" RENAME TO "Doctor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
