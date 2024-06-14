/*
  Warnings:

  - The `adoption_requirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoption_requirements",
ADD COLUMN     "adoption_requirements" TEXT[];
