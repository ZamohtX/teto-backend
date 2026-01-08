/*
  Warnings:

  - You are about to drop the `task_instances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task_instances" DROP CONSTRAINT "task_instances_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "task_instances" DROP CONSTRAINT "task_instances_taskDefId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_taskInstanceId_fkey";

-- DropForeignKey
ALTER TABLE "validations" DROP CONSTRAINT "validations_taskInstanceId_fkey";

-- DropTable
DROP TABLE "task_instances";

-- CreateTable
CREATE TABLE "task_instance" (
    "id" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "proofPhotoUrl" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "taskDefId" TEXT NOT NULL,
    "assignedToId" TEXT,

    CONSTRAINT "task_instance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_instance" ADD CONSTRAINT "task_instance_taskDefId_fkey" FOREIGN KEY ("taskDefId") REFERENCES "task_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_instance" ADD CONSTRAINT "task_instance_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validations" ADD CONSTRAINT "validations_taskInstanceId_fkey" FOREIGN KEY ("taskInstanceId") REFERENCES "task_instance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_taskInstanceId_fkey" FOREIGN KEY ("taskInstanceId") REFERENCES "task_instance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
