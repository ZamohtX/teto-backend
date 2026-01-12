-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_houseId_fkey";

-- DropForeignKey
ALTER TABLE "task_definitions" DROP CONSTRAINT "task_definitions_houseId_fkey";

-- DropForeignKey
ALTER TABLE "task_instance" DROP CONSTRAINT "task_instance_taskDefId_fkey";

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_definitions" ADD CONSTRAINT "task_definitions_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_instance" ADD CONSTRAINT "task_instance_taskDefId_fkey" FOREIGN KEY ("taskDefId") REFERENCES "task_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
