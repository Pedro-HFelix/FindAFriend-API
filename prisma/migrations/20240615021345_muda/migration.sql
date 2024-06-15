/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "pictures" TEXT[];

-- DropTable
DROP TABLE "Picture";
