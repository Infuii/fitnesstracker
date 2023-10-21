-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeightRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" REAL NOT NULL
);
INSERT INTO "new_WeightRecord" ("date", "id", "userId", "weight") SELECT "date", "id", "userId", "weight" FROM "WeightRecord";
DROP TABLE "WeightRecord";
ALTER TABLE "new_WeightRecord" RENAME TO "WeightRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
