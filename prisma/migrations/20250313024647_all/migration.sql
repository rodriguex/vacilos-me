-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mistake" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "mistake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mistake_period" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "mistake_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_mistake" (
    "id" SERIAL NOT NULL,
    "mistake_period_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mistake_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_mistake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mistake_name_key" ON "mistake"("name");

-- AddForeignKey
ALTER TABLE "user_mistake" ADD CONSTRAINT "user_mistake_mistake_period_id_fkey" FOREIGN KEY ("mistake_period_id") REFERENCES "mistake_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_mistake" ADD CONSTRAINT "user_mistake_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_mistake" ADD CONSTRAINT "user_mistake_mistake_id_fkey" FOREIGN KEY ("mistake_id") REFERENCES "mistake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
