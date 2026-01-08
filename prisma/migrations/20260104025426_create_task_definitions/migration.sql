/*
  Warnings:

  - The values [UNIQUE] on the enum `TaskFrequency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskFrequency_new" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'EMERGENCY', 'ONE_TIME');
ALTER TABLE "task_definitions" ALTER COLUMN "frequency" DROP DEFAULT;
ALTER TABLE "task_definitions" ALTER COLUMN "frequency" TYPE "TaskFrequency_new" USING ("frequency"::text::"TaskFrequency_new");
ALTER TYPE "TaskFrequency" RENAME TO "TaskFrequency_old";
ALTER TYPE "TaskFrequency_new" RENAME TO "TaskFrequency";
DROP TYPE "TaskFrequency_old";
ALTER TABLE "task_definitions" ALTER COLUMN "frequency" SET DEFAULT 'WEEKLY';
COMMIT;
