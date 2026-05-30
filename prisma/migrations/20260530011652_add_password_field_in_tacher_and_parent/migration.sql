-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'temp_password';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'temp_password';
