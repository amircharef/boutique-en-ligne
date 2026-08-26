-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colors" JSONB,
ADD COLUMN     "compareAtPrice" INTEGER,
ADD COLUMN     "outOfStockSizes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
