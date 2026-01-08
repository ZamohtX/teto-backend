/*
  Warnings:

  - The `frequency` column on the `task_definitions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaskFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'EMERGENCY');

-- AlterTable
ALTER TABLE "task_definitions" ADD COLUMN     "repeatCount" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "frequency",
ADD COLUMN     "frequency" "TaskFrequency" NOT NULL DEFAULT 'WEEKLY';
