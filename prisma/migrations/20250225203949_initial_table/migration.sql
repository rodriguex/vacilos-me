-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacilo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vacilo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_vacilo" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vacilo_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_vacilo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vacilo_name_key" ON "vacilo"("name");

-- AddForeignKey
ALTER TABLE "user_vacilo" ADD CONSTRAINT "user_vacilo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vacilo" ADD CONSTRAINT "user_vacilo_vacilo_id_fkey" FOREIGN KEY ("vacilo_id") REFERENCES "vacilo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
