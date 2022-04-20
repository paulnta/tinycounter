-- DropForeignKey
ALTER TABLE "Counter" DROP CONSTRAINT "Counter_spaceId_fkey";

-- AddForeignKey
ALTER TABLE "Counter" ADD CONSTRAINT "Counter_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
