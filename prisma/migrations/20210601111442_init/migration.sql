-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "value" INTEGER NOT NULL DEFAULT 0,
    "spaceId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Counter" ADD FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE SET NULL ON UPDATE CASCADE;
